import { useMemo } from "react";

import { useTheme } from "@mui/material";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useGetKpisQuery } from "@/state/api";
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";


const Row1 = () => {
    const { palette } = useTheme();

    const { data: kpiData } = useGetKpisQuery();
    // console.log("data: ", kpiData);

    const revenueExpenses = useMemo(() => {
        return (
            kpiData && (
                kpiData[0].monthlyData.map(({ month, revenue, expenses }) => {
                    return {
                        name: month.substring(0, 3).toUpperCase(),
                        revenue: revenue,
                        expenses: expenses,
                    }
                })
            )
        );
    }, [kpiData]);
    
    const revenueProfit = useMemo(() => {
        return (
            kpiData && (
                kpiData[0].monthlyData.map(({ month, revenue, expenses }) => {
                    return {
                        name: month.substring(0, 3).toUpperCase(),
                        revenue: revenue,
                        profit: (revenue - expenses).toFixed(2), // upto 2 decimal points
                    }
                })
            )
        );
    }, [kpiData]);
    
    const revenue = useMemo(() => {
        return (
            kpiData && (
                kpiData[0].monthlyData.map(({ month, revenue }) => {
                    return {
                        name: month.substring(0, 3).toUpperCase(),
                        revenue: revenue,
                    }
                })
            )
        );
    }, [kpiData]);


    return (
        <>
            <DashboardBox gridArea = "a">
                <BoxHeader
                    title = "Revenue and Expenses"
                    subtitle = "Top line represents Revenue, Bottom line represents Expenses"
                    sideText = "+4%"
                />
                
                <ResponsiveContainer
                    width = "100%"
                    height = "100%"
                >
                    <AreaChart
                        width = { 500 }
                        height = { 400 }
                        data = { revenueExpenses }
                        margin = {{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id = "colorRevenue"
                                x1 = "0"
                                y1 = "0"
                                x2 = "0"
                                y2 = "1"
                            >
                                <stop
                                    offset = "5%"
                                    stopColor = { palette.primary[300] }
                                    stopOpacity = { 0.5 }
                                />

                                <stop
                                    offset = "95%"
                                    stopColor = { palette.primary[300] }
                                    stopOpacity = { 0 }
                                />
                            </linearGradient>

                            <linearGradient
                                id = "colorExpenses"
                                x1 = "0"
                                y1 = "0"
                                x2 = "0"
                                y2 = "1"
                            >
                                <stop
                                    offset = "5%"
                                    stopColor = { palette.primary[300] }
                                    stopOpacity = { 0.5 }
                                />

                                <stop
                                    offset = "95%"
                                    stopColor = { palette.primary[300] }
                                    stopOpacity = { 0 }
                                />
                            </linearGradient>
                        </defs>

                        <XAxis 
                            dataKey = "name"
                            tickLine = { false }
                            style = {{
                                fontSize: "10px",
                            }}
                        />

                        <YAxis
                            tickLine = { false }
                            axisLine = {{
                                strokeWidth: "0",
                            }}
                            style = {{
                                fontSize: "10px",
                            }}
                            domain = { [8000, 23000] }
                        />

                        {/* <Tooltip /> */}
                        <Tooltip formatter = { (v) => `$${v}` } />

                        <Area 
                            type = "monotone"
                            dataKey = "revenue"
                            dot = { true }
                            stroke = { palette.primary.main }
                            fillOpacity = { 1 }
                            fill = "url(#colorRevenue)"
                        />

                        <Area 
                            type = "monotone"
                            dataKey = "expenses"
                            dot = { true }
                            stroke = { palette.primary.main }
                            fillOpacity = { 1 }
                            fill = "url(#colorExpenses)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea = "b">
                <BoxHeader
                    title = "Profit and Revenue"
                    subtitle = "Top line represents Revenue, Bottom line represents Profit"
                    sideText = "+4%"
                />

                <ResponsiveContainer
                    width = "100%"
                    height = "100%"
                >
                    <LineChart
                        data = { revenueProfit }
                        margin = {{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid
                            vertical = { false }
                            stroke = { palette.grey[800] }
                        />

                        <XAxis 
                            dataKey = "name"
                            tickLine = { false }
                            style = {{
                                fontSize: "10px",
                            }}
                        />

                        <YAxis
                            yAxisId = "left"
                            tickLine = { false }
                            axisLine = { false }
                            style = {{
                                fontSize: "10px",
                            }}
                        />

                        <YAxis
                            yAxisId = "right"
                            orientation = "right"
                            tickLine = { false }
                            axisLine = { false }
                            style = {{
                                fontSize: "10px",
                            }}
                        />

                        {/* <Tooltip /> */}
                        <Tooltip formatter = { (v) => `$${v}` } />

                        <Legend
                            height = { 20 }
                            wrapperStyle = {{
                                margin: "0 0 10px 0"
                            }}
                        />

                        <Line
                            type = "monotone"
                            yAxisId = "left"
                            dataKey = "profit"
                            stroke = { palette.tertiary[500] }
                        />

                        <Line
                            type = "monotone"
                            yAxisId = "right"
                            dataKey = "revenue"
                            stroke = { palette.primary.main }
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            <DashboardBox gridArea = "c">
                <BoxHeader
                    title = "Revenue Month by Month"
                    subtitle = "Graph representing the revenue of each month"
                    sideText = "+4%"
                />

                <ResponsiveContainer
                    width = "100%"
                    height = "100%"
                >
                    <BarChart
                        width = { 500 }
                        height = { 300 }
                        data = { revenue }
                        margin = {{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id = "colorRevenue"
                                x1 = "0"
                                y1 = "0"
                                x2 = "0"
                                y2 = "1"
                            >
                                <stop
                                    offset = "5%"
                                    stopColor = { palette.primary[300] }
                                    stopOpacity = { 0.8 }
                                />

                                <stop
                                    offset = "95%"
                                    stopColor = { palette.primary[300] }
                                    stopOpacity = { 0 }
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical = { false }
                            stroke = { palette.grey[800] } 
                        />

                        <XAxis
                            dataKey = "name"
                            axisLine = { false }
                            tickLine = { false }
                            style = {{
                                fontSize: "10px",
                            }}
                        />
                        
                        <YAxis
                            axisLine = { false }
                            tickLine = { false }
                            style = {{
                                fontSize: "10px",
                            }}
                        />

                        {/* <Tooltip /> */}
                        <Tooltip formatter = { (v) => `$${v}` } />

                        <Bar
                            dataKey = "revenue"
                            fill = "url(#colorRevenue)"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    );
};


export default Row1;
