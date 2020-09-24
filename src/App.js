import React, {useState, useEffect} from 'react';
import './App.css';
import Editor from './Components/Editor';
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [javascript, setJavascript] = useLocalStorage('javascript', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
        <body>${html}</body>
        <script>${javascript}</script>
        <style>${css}</style>
      </html>`)
    }, 250);

    return () => clearTimeout(timeout)
  }, [html, css, javascript])

  return (
    <>
    <div className="pane top-pane">
      <Editor displayName="HTML" value={html} language="xml" onChange={setHtml}  />
      <Editor displayName="CSS" value={css} language="css" onChange={setCss} />
      <Editor displayName="JavaScript" value={javascript} language="javascript" onChange={setJavascript} />
    </div>
    <h1 className="h1"> Your Output:</h1>
    <div className="pane">
      <iframe 
      srcDoc={srcDoc}
      title="output"
      sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
      />
    </div>
    </>
    );
}

export default App;
