import React from 'react';
import { Text as DefaultText } from 'react-native';
import { appstyle } from './appstyle';
import useTheme from './useTheme';

const Text = (props) => {
  const theme = useTheme();

  return (
    <DefaultText {...props} style={[appstyle(theme).text, props.style]} >{props.children}</DefaultText>
  );
};

export default Text;