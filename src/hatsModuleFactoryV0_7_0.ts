//import { log } from "@graphprotocol/graph-ts";
import { HatsModuleFactory_ModuleDeployed } from "../generated/HatsModuleFactoryV0_7_0/HatsModuleFactoryV0_7_0";
import { MultiClaimsHatter } from "../generated/templates";
import { ClaimsHatter } from "../generated/schema";
import { MULTI_CLAIMS_HATTER_IMPLEMENTATION, MULTI_CLAIMS_HATTER_IMPLEMENTATION_V0_2_0 } from "./constants";

export function handleModuleDeployed(
  event: HatsModuleFactory_ModuleDeployed
): void {
  const isClaimsHatter =
    event.params.implementation.toHexString() ==
    MULTI_CLAIMS_HATTER_IMPLEMENTATION ||
    event.params.implementation.toHexString() ==
    MULTI_CLAIMS_HATTER_IMPLEMENTATION_V0_2_0;
  if (isClaimsHatter) {
    MultiClaimsHatter.create(event.params.instance);
    const claimsHatter = new ClaimsHatter(event.params.instance.toHexString());
    claimsHatter.claimableHats = [];
    claimsHatter.claimableForHats = [];
    claimsHatter.save();
  }
}
