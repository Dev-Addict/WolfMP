import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
    useNavigationBuilder,
    DefaultNavigatorOptions,
    TabRouter,
    TabActions,
    TabRouterOptions,
    TabNavigationState,
    createNavigatorFactory,
} from '@react-navigation/native';

import Text from '../../components/Text';
import styles from "../../styles";

type IconProps = {
    color: string;
    size: number;
};

type TabNavigationOptions = {
    title?: string;
    icon: FC<IconProps>;
};

type TabNavigationEventMap = {
    tabPress: {
        data: { isAlreadyFocused: boolean }
        canPreventDefault: true
    };
};

type Props = DefaultNavigatorOptions<TabNavigationOptions> &
    TabRouterOptions;

const SideTabNavigator = (
    {
        initialRouteName,
        children,
        screenOptions
    }: Props) => {
    const {state, navigation, descriptors} = useNavigationBuilder<TabNavigationState,
        TabRouterOptions,
        TabNavigationOptions,
        TabNavigationEventMap>(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });

    return (
        <View style={{flexDirection: 'row'}}>
            <View style={styles.sideBar}>
                {state.routes.map(route => {
                    const Icon = descriptors[route.key].options.icon;

                    const isSelected = state.routes[state.index].key === route.key;

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={() => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    data: {
                                        isAlreadyFocused: route.key === state.routes[state.index].key,
                                    },
                                    canPreventDefault: true
                                });

                                if (!event.defaultPrevented) {
                                    navigation.dispatch({
                                        ...TabActions.jumpTo(route.name),
                                        target: state.key,
                                    });
                                }
                            }}
                            style={{flex: 1}}
                        >
                            <View style={{
                                alignItems: 'center'
                            }}>
                                <Icon color={isSelected ? "#D3D4D6" : "#D3D4D666"} size={26}/>
                            </View>
                            <Text style={isSelected ? {} : {color: "#D3D4D666"}}>
                                {descriptors[route.key].options.title || route.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <View style={{flex: 16}}>
                {descriptors[state.routes[state.index].key].render()}
            </View>
        </View>
    );
};

export default createNavigatorFactory<TabNavigationState,
    TabNavigationOptions,
    TabNavigationEventMap,
    typeof SideTabNavigator>(SideTabNavigator);
