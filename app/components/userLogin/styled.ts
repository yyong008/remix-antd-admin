import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  /* background-image: url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr"); */
  background-size: 100% 100%;
`;

const LoginContent = styled.div`
  flex: 1;
  padding: 32px 0;
`;

const HDiv = styled.div`
  margin-bottom: 24;
`;

export { LoginContainer, LoginContent, HDiv };
