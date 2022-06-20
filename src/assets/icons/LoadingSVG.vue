<template>
  <svg viewBox="0 0 100 100" style="transform: scale(1.5)">
    <circle cx="84" cy="50" r="10">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="0.25s"
        calcMode="spline"
        keyTimes="0;1"
        values="10;0"
        keySplines="0 0.5 0.5 1"
        begin="0s"
      />
      <animate
        attributeName="fill"
        repeatCount="indefinite"
        dur="1s"
        calcMode="discrete"
        keyTimes="0;0.25;0.5;0.75;1"
        begin="0s"
      />
    </circle>
    <circle cx="16" cy="50" r="10">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="0s"
      />
    </circle>
    <circle cx="50" cy="50" r="10">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.25s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.25s"
      />
    </circle>
    <circle cx="84" cy="50" r="10">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.5s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.5s"
      />
    </circle>
    <circle cx="16" cy="50" r="10">
      <animate
        attributeName="r"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="0;0;10;10;10"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.75s"
      />
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.25;0.5;0.75;1"
        values="16;16;16;50;84"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.75s"
      />
    </circle>
  </svg>
</template>
