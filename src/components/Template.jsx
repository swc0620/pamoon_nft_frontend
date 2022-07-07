import React,{ useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card';
import Caver from 'caver-js';
import PamoonNFTArtifact from "../artifacts/PamoonNFT.json";
import KIP17 from "../artifacts/KIP17.json";


const Wrap = styled.div`
  width:100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
  justify-content:space-evenly;
`;

function Template() {
  const [cards, setCards] = useState([]);
  const cardId = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      const cardArray = [];
      try {
        console.log(1);
        const caver = new Caver(process.env.REACT_APP_CYPRESS_URI);
        const krafterspaceContract = new caver.contract(KIP17.abi, process.env.REACT_APP_KRAFTERSPACE_CONTRACT_ADDRESS, { gasPrice: caver.utils.toBN(process.env.REACT_APP_GAS_PRICE).toString() });
        const pamoonContract = new caver.contract(PamoonNFTArtifact.abi, process.env.REACT_APP_PAMOON_NFT_CONTRACT_ADDRESS, { gasPrice: caver.utils.toBN(process.env.REACT_APP_GAS_PRICE).toString() });
        console.log(2);
        // krafterspace contract tokens
        const tokens = process.env.REACT_APP_TOKEN_IDS.split(', ').map(id => parseInt(id));
        console.log(3);
        while (true) {
          if (cardId.current < 5) {
            // krafterspace contract
            console.log(tokens);
            console.log(cardId.current);
            console.log(typeof tokens[cardId.current]);
            const imgJSON = await krafterspaceContract.methods.tokenURI(caver.utils.toBN(tokens[cardId.current]).toString()).call();
            console.log(4);
            let imgData;
            await fetch(imgJSON)
              .then((result) => result.json())
              .then((output) => {
                imgData = output.image;
              })
              .catch((err) => console.error(err));
            
            console.log(5);
            const walletData = await krafterspaceContract.methods.ownerOf(caver.utils.toBN(tokens[cardId.current]).toString()).call();
            const newItem = {
              id: cardId.current,
              img: imgData,
              wallet: walletData,
            };
            cardArray.push(newItem);
            console.log(6);
          } else {
            // pamoon contract
            try {
              console.log(7);
              const imgData = await pamoonContract.methods.tokenURI(cardId.current-4).call();
              console.log(8);
              const walletData = await pamoonContract.methods.ownerOf(cardId.current-4).call();
              const newItem = {
                id: cardId.current,
                img: imgData,
                wallet: walletData,
              };
              cardArray.push(newItem);
              console.log(9);
            } catch(e) {
              console.log(e)
              break;
            }  
          }
          cardId.current += 1;
        }
      } catch (e) {
        console.log(e);
      }
      setCards(cardArray);
    }
    fetchData();
  }, []);

  return (
      <Wrap>
        {cards.map((card) => <Card key={card.id} img={card.img} wallet={card.wallet} number={card.id}></Card>)}
      </Wrap>
  )
}

export default Template;