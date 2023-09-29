import { BigInt, Address, log, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { HatsModuleFactory_ModuleDeployed } from "../generated/HatsModuleFactory/HatsModuleFactory";
import { MultiClaimsHatter } from "../generated/templates";
import { ClaimsHatter } from "../generated/schema";
import { MULTI_CLAIMS_HATTER_IMPLEMENTATION } from "./constants";

export function handleModuleDeployed(
  event: HatsModuleFactory_ModuleDeployed
): void {
  const isClaimsHatter =
    event.params.implementation.toHexString() ==
    MULTI_CLAIMS_HATTER_IMPLEMENTATION;
  if (isClaimsHatter) {
    MultiClaimsHatter.create(event.params.instance);
    let claimsHatter = new ClaimsHatter(event.params.instance.toHexString());
    claimsHatter.claimableHats = [];
    claimsHatter.claimableForHats = [];
    claimsHatter.save();
    //const decoded = ethereum.decode("(uint256[],uint8[])", event.params.initData);
    //if (decoded !== null) {
    //  log.info("decoded init args {}", [decoded.toString()]);
    //}
  }
}
