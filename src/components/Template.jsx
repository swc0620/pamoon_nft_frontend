import React, { useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card';
import Caver from 'caver-js';
import PamoonNFTArtifact from "../artifacts/PamoonNFT.json";
import KIP17 from "../artifacts/KIP17.json";

const Wrap=styled.div`
  background-color:#F5F5F5;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-evenly;
  padding-top:15px;
`;

function Template() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const caver = new Caver(process.env.REACT_APP_CYPRESS_URI);
        const krafterspaceContract = new caver.contract(KIP17.abi, process.env.REACT_APP_KRAFTERSPACE_CONTRACT_ADDRESS, { gasPrice: process.env.REACT_APP_GAS_PRICE });
        const pamoonContract = new caver.contract(PamoonNFTArtifact.abi, process.env.REACT_APP_PAMOON_NFT_CONTRACT_ADDRESS, { gasPrice: process.env.REACT_APP_GAS_PRICE });
        
        // krafterspace contract
        const tokens = process.env.REACT_APP_TOKEN_IDS.split(', ').map(id => parseInt(id))
        console.log(await krafterspaceContract.methods.ownerOf(tokens[0]).call());
        console.log(await krafterspaceContract.methods.tokenURI(tokens[0]).call());
        
        // pamoon contract
        console.log(await pamoonContract.methods.name().call());
        console.log(await pamoonContract.methods.ownerOf(1).call());
        console.log(await pamoonContract.methods.tokenURI(2).call());
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Card></Card>
  )
}

export default Template