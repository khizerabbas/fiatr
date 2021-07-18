import "react-pro-sidebar/dist/css/styles.css";
import { IntlProvider } from "react-intl";
import Layout from "./Home/Layout";
import "./flatr.css";
// import  messages from './Components/message';
import { useState } from "react";
// messages={messages[locale]}
function Flatr() {
  const [locale, setLocale] = useState("en");
  return (
    <IntlProvider locale={locale}>
      <Layout setLocale={setLocale} />
    </IntlProvider>
  );
}

export default Flatr;
