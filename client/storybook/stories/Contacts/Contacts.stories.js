import React from "react";
import { storiesOf } from "@storybook/react-native";
import Contacts from ".";
import Button from '.';

storiesOf("Contacts", module)
    .add('with 10 contacts', () => (
        <Contacts />
    ))