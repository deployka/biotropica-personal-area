import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {PromotionHeader, PromotionHeaderProps} from "./PromotionHeader";

export default {
    component: PromotionHeader,
    title: "src/components/PromotionHeader",
} as Meta;

const Template: ComponentStory<typeof PromotionHeader> = (args: PromotionHeaderProps) => <PromotionHeader {...args} />;
export const DefaultPromotionHeader = Template.bind({});
const props: Partial<PromotionHeaderProps> = {};

DefaultPromotionHeader.args = props;
