// src/mapping.ts (AssemblyScript)
import { Bytes } from '@graphprotocol/graph-ts';

import {
  AuctionStarted,
  BidPlaced,
  AuctionEnded,
  DomainSubmitted,
  Withdrawal,
  OwnershipTransferred
} from '../generated/DomaContract/DomaContract';

import {
  AuctionStartedEntity,
  BidPlacedEntity,
  AuctionEndedEntity,
  DomainSubmittedEntity,
  WithdrawalEntity,
  OwnershipTransferredEntity,
} from '../generated/schema';

function makeId(txHash: Bytes, logIndex: i32): string {
  // txHash + logIndex -> ID unik
  return txHash.toHex() + '-' + logIndex.toString();
}

export function handleAuctionStarted(event: AuctionStarted): void {
  const id = makeId(event.transaction.hash, event.logIndex.toI32());
  const e = new AuctionStartedEntity(id);
  e.tokenId = event.params.tokenId;
  e.endTime = event.params.endTime;
  e.txHash = event.transaction.hash;
  e.blockNumber = event.block.number;
  e.timestamp = event.block.timestamp;
  e.save();
}

export function handleBidPlaced(event: BidPlaced): void {
  const id = makeId(event.transaction.hash, event.logIndex.toI32());
  const e = new BidPlacedEntity(id);
  e.bidder = event.params.bidder;
  e.tokenId = event.params.tokenId;
  e.amount = event.params.amount;
  e.txHash = event.transaction.hash;
  e.blockNumber = event.block.number;
  e.timestamp = event.block.timestamp;
  e.save();
}

export function handleAuctionEnded(event: AuctionEnded): void {
  const id = makeId(event.transaction.hash, event.logIndex.toI32());
  const e = new AuctionEndedEntity(id);
  e.tokenId = event.params.tokenId;
  e.winner = event.params.winner;
  e.price = event.params.price;
  e.txHash = event.transaction.hash;
  e.blockNumber = event.block.number;
  e.timestamp = event.block.timestamp;
  e.save();
}

export function handleDomainSubmitted(event: DomainSubmitted): void {
  const id = makeId(event.transaction.hash, event.logIndex.toI32());
  const e = new DomainSubmittedEntity(id);
  e.seller = event.params.seller;
  e.tokenId = event.params.tokenId;
  e.txHash = event.transaction.hash;
  e.blockNumber = event.block.number;
  e.timestamp = event.block.timestamp;
  e.save();
}

export function handleWithdrawal(event: Withdrawal): void {
  const id = makeId(event.transaction.hash, event.logIndex.toI32());
  const e = new WithdrawalEntity(id);
  e.user = event.params.user;
  e.amount = event.params.amount;
  e.txHash = event.transaction.hash;
  e.blockNumber = event.block.number;
  e.timestamp = event.block.timestamp;
  e.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  const id = makeId(event.transaction.hash, event.logIndex.toI32());
  const e = new OwnershipTransferredEntity(id);
  e.previousOwner = event.params.previousOwner;
  e.newOwner = event.params.newOwner;
  e.txHash = event.transaction.hash;
  e.blockNumber = event.block.number;
  e.timestamp = event.block.timestamp;
  e.save();
}
