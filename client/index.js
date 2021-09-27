/**
 * @format
 */

import StorybookUIRoot from "./storybook";
import {AppRegistry} from 'react-native';
import App from '@app/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => __DEV__ ? StorybookUIRoot : App);