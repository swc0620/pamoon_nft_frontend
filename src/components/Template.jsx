import React,{useState,useRef,useEffect,useCallback} from 'react'
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
  const [cards,setCards]=useState([]);
  const cardId=useRef(0);
  const addCard=useCallback((img,wallet)=>{
    const newItem={
      id:cardId.current,
      img,
      wallet,
    }
    setCards([...cards,newItem]);
    cardId.current+=1;
  },[cards])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const caver = new Caver(process.env.REACT_APP_CYPRESS_URI);
        const krafterspaceContract = new caver.contract(KIP17.abi, process.env.REACT_APP_KRAFTERSPACE_CONTRACT_ADDRESS, { gasPrice: process.env.REACT_APP_GAS_PRICE });
        const pamoonContract = new caver.contract(PamoonNFTArtifact.abi, process.env.REACT_APP_PAMOON_NFT_CONTRACT_ADDRESS, { gasPrice: process.env.REACT_APP_GAS_PRICE });
        // krafterspace contract tokens
        const tokens = process.env.REACT_APP_TOKEN_IDS.split(', ').map(id => parseInt(id));
        while(1){
          if(cardId.current<4){
            // krafterspace contract
            const imgData=await krafterspaceContract.methods.tokenURI(tokens[cardId.current]).call();
            const walletData= await krafterspaceContract.methods.ownerOf(tokens[cardId.current]).call();
            addCard(imgData,walletData)
          }else{
            // pamoon contract
            try{
              //index 0부터 시작한다고 가정했을때
              const imgUrl=await pamoonContract.methods.tokenURI(cardId.current-4).call();
              let imgData;
              fetch(imgUrl)
              .then(result => result.json())
              .then((output) => {
                imgData=output.image
              }).catch(err => console.error(err));
              const walletData= await pamoonContract.methods.ownerOf(cardId.current-4).call();
              addCard(imgData,walletData)
            }catch{
              break;
            }  
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [addCard]);
  return (
    <Wrap>
      {cards.map((card)=><Card key={card.id} img={card.token} wallet={card.wallet} number={card.id}></Card>)}
    </Wrap>
  )
}

export default Template