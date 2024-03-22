//import { log } from "@graphprotocol/graph-ts";
import { HatsModuleFactory_ModuleDeployed } from "../generated/HatsModuleFactoryV0_6_0/HatsModuleFactoryV0_6_0";
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
    const claimsHatter = new ClaimsHatter(event.params.instance.toHexString());
    claimsHatter.claimableHats = [];
    claimsHatter.claimableForHats = [];
    claimsHatter.save();
  }
}
