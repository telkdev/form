import {
  TInput,
  TButton,
  TModal,
  // ...Rest of the components
} from "vue-tailwind/dist/components";

const VueTailwindSettings = {
  "t-input": {
    component: TInput,
    props: {
      classes: "border-2 block w-full rounded text-gray-800",
      // ...More settings
    },
  },
  "t-button": {
    component: TButton,
    props: {
      fixedClasses:
        "block px-4 py-2 transition duration-100 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      classes:
        "text-white bg-blue-700 border border-transparent shadow-sm rounded hover:bg-blue-800",
      variants: {
        secondary:
          "text-gray-800 bg-white border border-gray-300 shadow-sm hover:text-gray-600",
        error:
          "text-white bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600",
        success:
          "text-white bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600",
        link: "text-blue-500 underline hover:text-blue-600",
      },
    },
  },
  "t-modal": {
    component: TModal,
    props: {
      fixedClasses: {
        overlay:
          "z-40  overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-50",
        wrapper: "relative mx-auto z-50 max-w-lg px-3 py-12",
        modal: "overflow-visible relative  rounded",
        body: "p-2 md:p-4 xl:p-5",
        header: "border-b p-3 rounded-t",
        footer: " p-3 rounded-b",
        close:
          "flex items-center justify-center rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50",
      },
      classes: {
        overlay: "bg-black",
        wrapper: "",
        modal: "bg-white shadow",
        body: "",
        header: "border-gray-100",
        footer: "bg-gray-100",
        close: "bg-gray-100 text-gray-600 hover:bg-gray-200",
        closeIcon: "fill-current h-4 w-4",
        overlayEnterClass: "opacity-0",
        overlayEnterActiveClass: "transition ease-out duration-100",
        overlayEnterToClass: "opacity-100",
        overlayLeaveClass: "opacity-100",
        overlayLeaveActiveClass: "transition ease-in duration-75",
        overlayLeaveToClass: "opacity-0",
        enterClass: "",
        enterActiveClass: "",
        enterToClass: "",
        leaveClass: "",
        leaveActiveClass: "",
        leaveToClass: "",
      },
      variants: {
        danger: {
          overlay: "bg-red-100",
          header: "border-red-50 text-red-700",
          close:
            "bg-red-50 text-red-700 hover:bg-red-200 border-red-100 border",
          modal: "bg-white border border-red-100 shadow-lg",
          footer: "bg-red-50",
        },
      },
    },
  },
  // ...Rest of the components
};

export default VueTailwindSettings;
