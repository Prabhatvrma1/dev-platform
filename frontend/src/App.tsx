function App() {
  return (
  <>
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl p-10">
        <h1 className="text-5xl font-bold text-primary">Hello World 🌍</h1>
        <p className="text-lg text-base-content/70 mt-4 text-center">
          Vite + React + Tailwind CSS + DaisyUI
        </p>
        <div className="flex gap-3 mt-6 justify-center">
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
        </div>
      </div>
    </div>
  </> 
  )
}

export default App
