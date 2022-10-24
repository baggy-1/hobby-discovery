interface Props {
  width?: number;
  height?: number;
  isTarget: boolean;
}

const Star = ({ width, height, isTarget }: Props) => {
  return (
    <svg
      width={width || "74"}
      height={height || "63"}
      viewBox="0 0 74 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M37 0L45.5315 23.8389H73.1402L50.8043 38.5722L59.3358 62.4111L37 47.6778L14.6642 62.4111L23.1957 38.5722L0.859852 23.8389H28.4685L37 0Z"
        fill={isTarget ? "#F4BB5F" : "#8E8E8E"}
      />
    </svg>
  );
};

export default Star;
