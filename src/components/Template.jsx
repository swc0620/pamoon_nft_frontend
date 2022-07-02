import React from 'react'
import styled from 'styled-components'
import Card from './Card';

const Wrap=styled.div`
  background-color:#F5F5F5;
  display:flex;
  flex-wrap:wrap;
  justify-content:space-evenly;
  padding-top:15px;
`;

function Template() {
  return (
    <Wrap>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </Wrap>
  )
}

export default Template