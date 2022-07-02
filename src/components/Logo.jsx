import React from 'react'
import styled from 'styled-components'

const LogoText=styled.div`
  background-color:black;
  color:white;
  width:100%;
  text-align:center;
  height:100px;
  line-height:100px;
  font-size:32px;
  font-weight:700;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  img{
    width:36px;
    height:36px;
    margin-right:10px;
  }
`

function Logo(props) {
  return (
    <LogoText>
      <img alt='img' src={process.env.PUBLIC_URL+'band.png'}></img>
      {props.children}
    </LogoText>
  )
}

export default Logo