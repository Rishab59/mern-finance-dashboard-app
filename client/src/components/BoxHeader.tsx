import React from "react";
import { useTheme } from "@emotion/react";

import { Box, Typography } from "@mui/material";

import FlexBetween from "./FlexBetween";


type Props = {
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    sideText: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
    const { palette } = useTheme();


    return (
        <FlexBetween
            color = { palette.grey[400] }
            margin = "1.1rem 1rem 0 1rem"
        >
            <FlexBetween>
                { icon }

                <Box width = "100%">
                    <Typography
                        variant = "h4"
                        mb = "-0.1rem"
                    >
                        { title }
                    </Typography>

                    <Typography variant = "h6">
                        { subtitle }
                    </Typography>
                </Box>
            </FlexBetween>

            <Typography
                variant = "h5"
                fontWeight = "700"
                color = { palette.secondary[500] }
            >
                { sideText }
            </Typography>
        </FlexBetween>
    );
};


export default BoxHeader;
