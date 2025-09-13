import { Icon, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: 'house', selected: 'house.fill' }} drawable="custom_home_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <Icon sf={{ default: 'gear.circle', selected: 'gear.circle.fill' }} drawable="custom_home_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
