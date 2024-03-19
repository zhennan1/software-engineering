import Head from "next/head";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import store, { RootState } from "../redux/store";
import { resetAuth } from "../redux/auth";
import { useRouter } from "next/router";
import { Provider, useSelector, useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/naming-convention
const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Head>
                <title> Conway&#39;s life game</title>
            </Head>
            <div style={{ padding: 12 }}>
                <Component {...pageProps} />
                {router.pathname !== "/login" && (auth.token ? (
                    <>
                        <p>Logged in as user name: {auth.name}</p>
                        <button onClick={() => dispatch(resetAuth())}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => router.push("/login")}>Go to login</button>
                ))}
            </div>
        </>
    );
};

export default function AppWrapper(props: AppProps) {
    return (
        <Provider store={store}>
            <App {...props} />
        </Provider>
    );
}
