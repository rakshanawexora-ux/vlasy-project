export function Process() {
  return (
    <div className="process-grid">
      {[
        [
          'Consultation',
          'Tell us what you would like to change, share references and mention any sensitivities or previous treatments.',
        ],
        [
          'Recommendation',
          'Discuss suitable options, preparation, maintenance and pricing before agreeing on a direction.',
        ],
        [
          'Transformation',
          'Your agreed service and appointment details are confirmed by the team before the work begins.',
        ],
        [
          'Aftercare',
          'Ask how to care for your hair or skin at home and when to plan a maintenance appointment.',
        ],
      ].map(([title, description], i) => (
        <div key={title}>
          <span className="process-number">0{i + 1}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}
