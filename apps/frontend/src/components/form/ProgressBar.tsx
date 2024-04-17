const ProgressBar: React.FC<{ step: number; numSteps: number }> = ({
  step,
  numSteps,
}) => {
  const percent = (step / numSteps) * 100;
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: '16px',
      }}
    >
      <div
        style={{
          margin: '36px 0',
          width: '100%',
          backgroundColor: '#B6ABED',
          borderRadius: '10px',
          height: '30px',
        }}
      >
        <div
          style={{
            backgroundColor: '#422669',
            width: `${percent}%`,
            height: '30px',
            borderRadius: '10px',
            transition: 'width 1s',
          }}
        />
      </div>
      <span style={{ fontSize: '20px' }}>
        {step}/{numSteps}
      </span>
    </div>
  );
};

export default ProgressBar;
