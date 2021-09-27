import React from "react";
import { storiesOf } from "@storybook/react-native";
import Container from "./../../Container";
import Input from "@app/components/Input";

storiesOf("Input", module)
    .add("light input", () => (
       <Container>
            <Input placeholder="default placeholder" />
        </Container>
    ))
    .add("dark input", () => (
        <Container>
             <Input backgroundColorTheme={"dark"} placeholder="default placeholder" />
         </Container>
     ))