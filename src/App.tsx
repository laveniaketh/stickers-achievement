import Achievement from "@/components/Achievement";
import sampleImage from "@/assets/toilet_1_texture-nobg.png";
const App = () => {

  return (
    <main className="flex items-center justify-center ">
      <Achievement
        title="Highest Burger Stacked!"
        sticker={sampleImage}
      />
    </main>

  )
}

export default App
