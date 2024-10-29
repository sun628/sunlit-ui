<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <n-tooltip class="box-item" content="Top Left prompts info" placement="top-start">
        <n-button>top-start</n-button>
      </n-tooltip>
      <n-tooltip class="box-item" content="Top Center prompts info" placement="top">
        <n-button>top</n-button>
      </n-tooltip>
      <n-tooltip class="box-item" content="Top Right prompts info" placement="top-end">
        <n-button>top-end</n-button>
      </n-tooltip>
    </div>
    <div class="row">
      <n-tooltip class="box-item" content="Left Top prompts info" placement="left-start">
        <n-button>left-start</n-button>
      </n-tooltip>
      <n-tooltip
        class="box-item"
        content="Right Top prompts info"
        placement="right-start"
      >
        <n-button>right-start</n-button>
      </n-tooltip>
    </div>
    <div class="row">
      <n-tooltip class="box-item" content="Left Center prompts info" placement="left">
        <n-button class="mt-3 mb-3">left</n-button>
      </n-tooltip>
      <n-tooltip class="box-item" content="Right Center prompts info" placement="right">
        <n-button>right</n-button>
      </n-tooltip>
    </div>
    <div class="row">
      <n-tooltip class="box-item" content="Left Bottom prompts info" placement="left-end">
        <n-button>left-end</n-button>
      </n-tooltip>
      <n-tooltip
        class="box-item"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <n-button>right-end</n-button>
      </n-tooltip>
    </div>
    <div class="row center">
      <n-tooltip
        class="box-item"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <n-button>bottom-start</n-button>
      </n-tooltip>
      <n-tooltip class="box-item" content="Bottom Center prompts info" placement="bottom">
        <n-button>bottom</n-button>
      </n-tooltip>
      <n-tooltip
        class="box-item"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <n-button>bottom-end</n-button>
      </n-tooltip>
    </div>
  </div>
</template>

<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
