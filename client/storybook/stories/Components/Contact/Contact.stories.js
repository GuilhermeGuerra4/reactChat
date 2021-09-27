import React from "react";
import { storiesOf } from "@storybook/react-native";
import Contact from "@app/components/Contact";
import Container from "../../Container";

storiesOf("Contact", module)
.add("default", () => (
    <Container>
        <Contact
            user={{name: "John Doe", image: "https://i.ibb.co/qmWmGJh/user.png"}} 
            lastMessage={"Hey"}
            isThereMessageToRead={true}
            />
    </Container>
))