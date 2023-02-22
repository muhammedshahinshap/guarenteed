import ScrollableFeed from "react-scrollable-feed";
import styled from "styled-components";
import { ChatState } from "../../../../../utils/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Wrapper style={{ display: "flex" }}>
            <span
              style={{
                backgroundColor: `${
                  m.sender === user._id ? "#B9F5D0" : "#BEE3F8"
                }`,
                marginLeft: m.sender === user._id ? "auto" : "0px",
                marginTop: "10px",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </Wrapper>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
const Wrapper = styled.div``;
