import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import CodeEditors from "./CodeEditors";
import ER from "./ER";
import Prompt from "./Prompt";
import "../styles/layout.css";
function Layout() {
  return (
    <div className="container">
      <Scoreboard/>
      <Timer/>
      <CodeEditors/>
      <Prompt/>
      <ER/>
    </div>

  )
}

export default Layout;