import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          drawable="custom_home_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="insights">
        <Label>Transactions</Label>
        <Icon
          sf={{ default: 'list.dash', selected: 'list.dash' }}
          drawable="custom_home_drawable"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
