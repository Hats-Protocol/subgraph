import { BigInt, Address, log, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { HatsModuleFactory_ModuleDeployed } from "../generated/HatsModuleFactory/HatsModuleFactory";
import { MultiClaimsHatter } from "../generated/templates";
import { ClaimsHatter } from "../generated/schema";

export function handleModuleDeployed(
  event: HatsModuleFactory_ModuleDeployed
): void {
  MultiClaimsHatter.create(event.params.instance);
  const claimsHatter = new ClaimsHatter(event.params.instance.toHexString());
  //const decoded = ethereum.decode("(uint256[],uint8[])", event.params.initData);
  //if (decoded !== null) {
  //  log.info("decoded init args {}", [decoded.toString()]);
  //}
  claimsHatter.save();
}
