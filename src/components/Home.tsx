interface HomeProps {
  onStart: () => void;
}

const Home = ({ onStart }: HomeProps) => (
  <section
    className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-20"
    aria-labelledby="home-title"
  >
    <div className="max-w-2xl">
      <p className="eyebrow mb-5">A focused learning checkpoint</p>
      <h1
        id="home-title"
        className="font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl"
      >
        QuizLab
        <span className="block text-accent-600">AI</span>
      </h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
        Test your understanding of Python, data analysis, and AI fundamentals in
        a fast, no-signup quiz with clear explanations at the end.
      </p>
      <button className="primary-button mt-9 gap-3" type="button" onClick={onStart}>
        Start a quiz
        <span aria-hidden="true" className="text-lg leading-none">
          →
        </span>
      </button>
    </div>

    <div className="surface relative overflow-hidden p-7 sm:p-9">
      <div
        aria-hidden="true"
        className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-[18px] border-accent-100"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full border-[20px] border-slate-100"
      />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Your two-minute loop
          </span>
          <span className="rounded-full bg-accent-50 px-3 py-1 font-mono text-[0.65rem] font-medium text-accent-700">
            01 / 04
          </span>
        </div>
        <div className="space-y-7 pt-8">
          {[
            ['01', 'Choose a topic', 'Python, analysis, ML, or deep learning'],
            ['02', 'Set the level', 'Easy, medium, or hard'],
            ['03', 'Answer up to 10', 'One question at a time'],
            ['04', 'Learn from the result', 'Score, answers, and explanations'],
          ].map(([number, title, description]) => (
            <div className="flex gap-4" key={number}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-mono text-xs font-medium text-slate-500">
                {number}
              </span>
              <div>
                <h2 className="font-display text-base font-bold text-ink">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Home;
