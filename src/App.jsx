import { Show, createEffect, createSignal } from "solid-js";
import GenericSelect from "./components/GenericSelect/GenericSelect";
import DownloadButton from "./components/DownloadButton/DownloadButton";

function App() {
  const [modelList, setModelList] = createSignal([
    "Buds",
    "BudsPlus",
    "BudsLive",
    "BudsPro",
    "Buds2",
    "Buds2Pro",
  ]);
  const [model, setModel] = createSignal("");
  const [firmwareArray, setfirmwareArray] = createSignal([]);
  const [yearList, setYearList] = createSignal([]);
  const [monthList, setMonthList] = createSignal([]);
  const [arrayMonthList, setArrayMonthList] = createSignal([]);
  const [verboseMonthList, setVerboseMonthList] = createSignal([]);
  const [selectedYear, setSelectedYear] = createSignal(0);
  const [selectedMonth, setSelectedMonth] = createSignal(0);
  const [firmwareList, setFirmwareList] = createSignal([]);
  const [detectedFirmwareList, setDetectedFirmwareList] = createSignal([]);
  const [selectedFirmware, setSelectedFirmware] = createSignal("");
  const [donwloadLink, setDownloadLink] = createSignal("");

  const resetAll = () => {
    setfirmwareArray([]);
    setYearList([]);
    resetMonth();
  };

  const resetMonth = () => {
    setMonthList([]);
    setArrayMonthList([]);
    setVerboseMonthList([]);
    setSelectedYear("");
    setSelectedMonth("");
    resetFirmware();
  };

  const resetFirmware = () => {
    setFirmwareList([]);
    setDetectedFirmwareList([]);
    resetDownloadParams();
  };

  const resetDownloadParams = () => {
    setSelectedFirmware("");
    setDownloadLink("");
  };

  const numberToMonth = (number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[number - 1];

    return { [month.toString()]: number };
  };

  const baseurl = `https://fw.timschneeberger.me/v2`;

  createEffect(async () => {
    if (model() === "") return;
    else
      try {
        await fetch(`${baseurl}/firmware/${model()}`)
          .then((res) => res.json())
          .then((data) => {
            setfirmwareArray(data);
          });
      } catch (error) {
        console.log(error);
      } finally {
      }
  });

  createEffect(() => {
    if (firmwareArray().length === 0) return;
    else {
      let years = [];
      firmwareArray().forEach((firmware) => {
        if (!years.includes(firmware.year)) {
          years.push(parseInt(firmware.year));
        }
      });

      setYearList(years);
    }
  });

  createEffect(() => {
    if (parseInt(selectedYear()) === 0) return;
    else {
      firmwareArray().forEach((firmware) => {
        if (
          firmware.year === parseInt(selectedYear()) &&
          !monthList().includes(parseInt(firmware.month))
        ) {
          setMonthList((prev) => [...prev, parseInt(firmware.month)]);
        }
      });
    }
  }, [selectedYear()]);

  createEffect(() => {
    if (monthList().length === 0) return;
    else {
      monthList().forEach((month) => {
        setArrayMonthList((prev) => [...prev, numberToMonth(parseInt(month))]);
      });
    }
  });

  createEffect(() => {
    if (arrayMonthList().length === 0) return;
    arrayMonthList().forEach((month) => {
      Object.keys(month).forEach((key) => {
        setVerboseMonthList((prev) => [...prev, key]);
      });
    });
  });

  createEffect(() => {
    if (selectedMonth() === "") return;
    else {
      let detectedMonth = arrayMonthList().filter((month) => month[selectedMonth()]);
      if (detectedMonth.length > 0) {
        firmwareArray().forEach((firmware) => {
          if (
            firmware.year === parseInt(selectedYear()) &&
            firmware.month === detectedMonth[0][selectedMonth()]
          ) {
            setDetectedFirmwareList((prev) => [...prev, firmware]);
          }
        });
      }
    }
  });

  createEffect(() => {
    if (detectedFirmwareList().length === 0) return;
    else {
      detectedFirmwareList().forEach((firmware) => {
        setFirmwareList((prev) => [...prev, firmware.buildName]);
      });
    }
  });

  createEffect(() => {
    setDownloadLink(`${baseurl}/firmware/download/${selectedFirmware()}`);
  }, [selectedFirmware()]);

  return (
    <div class='grid justify-items-center  h-screen'>
      <header class='grid h-[15vh] mt-[5vh] text-center place-items-center'>
        <div>
          <h1 class='text-5xl'>Galaxy Buds</h1>
          <div class=''>
            <h5>Firmware Downloader</h5>
          </div>
        </div>
      </header>

      <main class='flex flex-col h-[75vh] mt-[5vh] w-10/12 sm:w-6/12  lg:w-4/12'>
        <GenericSelect
          list={modelList()}
          selected={model()}
          setSelected={setModel}
          reset={resetAll}
          placeholder='Select your buds model'
        />
        <Show when={model() !== "" && yearList().length > 0}>
          <GenericSelect
            list={yearList()}
            selected={selectedYear()}
            setSelected={setSelectedYear}
            reset={resetMonth}
            placeholder='Select the year what you want'
          />
        </Show>
        <Show when={monthList().length > 0 && verboseMonthList().length > 0}>
          <GenericSelect
            list={verboseMonthList()}
            selected={selectedMonth()}
            setSelected={setSelectedMonth}
            reset={resetFirmware}
            placeholder='Select the month what you want'
          />
        </Show>
        <Show when={firmwareList().length > 0}>
          <GenericSelect
            list={firmwareList()}
            selected={selectedFirmware()}
            setSelected={setSelectedFirmware}
            placeholder='Select the firmware what you want'
            reset={resetDownloadParams}
          />
        </Show>

        <Show when={selectedFirmware() !== "" && donwloadLink() !== ""}>
          <DownloadButton link={donwloadLink()} firmwareSelected={selectedFirmware()} />
        </Show>
      </main>
    </div>
  );
}

export default App;
