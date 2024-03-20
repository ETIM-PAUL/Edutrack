import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Lecturer/Dashboard.jsx';
import Courses from './pages/Lecturer/Courses.jsx';
import CourseDetails from './pages/Lecturer/CourseDetails.jsx';
import StudentDashboard from './pages/Student/StudentDashboard.jsx';
import StudentCourses from './pages/Student/StudentCourses.jsx';
import StudentCourseDetails from './pages/Student/StudentCourseDetails.jsx';
import StudentAttendance from './pages/Student/StudentAttendance.jsx';
import StudentResult from './pages/Student/StudentResult.jsx';
import StudentClasslist from './pages/Student/StudentClasslist.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiProvider, http } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  // mainnetB
} from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors'
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { defineChain } from 'viem'
 
export const mainnetB = defineChain({
  id: 355113,
  name: 'Bitfinity Testnet',
  nativeCurrency: { name: 'Bitfinity', symbol: 'BFT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.bitfinity.network'] },
  },
  blockExplorers: {
    default: { name: 'Bitfinity', url: 'https://explorer.bitfinity.network' },
  },
  contracts: {
    // ensRegistry: {
    //   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    // },
    // ensUniversalResolver: {
    //   address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
    //   blockCreated: 16773775,
    // },
    // multicall3: {
    //   address: '0xca11bde05977b3631167028862be2a173976ca11',
    //   blockCreated: 14353601,
    // },
  },
})

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnetB],
  // ssr: true, // If your dApp uses server side rendering (SSR)
});
// export const config = createConfig({
//   chains: [mainnetB],
//   connectors: [metaMask()],
//   transports: {
//     // [mainnet.id]: http(),
//     [mainnetB.id]: http('https://testnet.bitfinity.network'),
//   },
// })

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/lecturer/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/lecturer/courses",
    element: <Courses />,
  },
  {
    path: "/lecturer/course-details/:id",
    element: <CourseDetails />,
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/student/courses",
    element: <StudentCourses />,
  },
  {
    path: "/student/classlist",
    element: <StudentClasslist />,
  },
  {
    path: "/student/attendance",
    element: <StudentAttendance />,
  },
  {
    path: "/student/result",
    element: <StudentResult />,
  },
  {
    path: "/student/course-details/:id",
    element: <StudentCourseDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
    <RouterProvider router={router} />
    </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
