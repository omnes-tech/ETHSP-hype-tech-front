import { Fragment } from "react";
import MenuTransition from "../Shared/MenuTransition";
import clsx from "clsx";
import { Menu } from "@headlessui/react";
import { StepperStore } from "@/store";

export function Select() {
  const { setSelect, select } = StepperStore();
  return (
    <Menu as="div" className="relative w-full">
      <Menu.Button as={Fragment}>
        <button
          className={`flex items-center w-full border-b pb-2 ${
            !select ? "text-[rgba(255,255,255,.6)]" : "text-white"
          }`}
        >
          {select ? select : "Selecionavel"}
        </button>
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          static
          className="absolute z-[5] mt-1 w-full rounded-xl border  shadow-sm focus:outline-none border-gray-700 bg-[#0FF9F7]"
        >
          <div className="m-2 flex-col flex gap-4 lg:gap-0">
            <Menu.Item
              as="p"
              className={({ active }) =>
                clsx(
                  { "dropdown-active": active },
                  "cursor-pointer overflow-hidden rounded-lg p-1"
                )
              }
              onClick={() => {
                setSelect("Aluno");
              }}
            >
              Aluno
            </Menu.Item>
            <Menu.Item
              as="p"
              className={({ active }) =>
                clsx(
                  { "dropdown-active": active },
                  "cursor-pointer overflow-hidden rounded-lg p-1"
                )
              }
              onClick={() => {
                setSelect("Professor");
              }}
            >
              Professor
            </Menu.Item>
            <Menu.Item
              as="p"
              className={({ active }) =>
                clsx(
                  { "dropdown-active": active },
                  "cursor-pointer overflow-hidden rounded-lg p-1"
                )
              }
              onClick={() => {
                setSelect("Financiador");
              }}
            >
              Financiador
            </Menu.Item>
            <Menu.Item
              as="p"
              className={({ active }) =>
                clsx(
                  { "dropdown-active": active },
                  "cursor-pointer overflow-hidden rounded-lg p-1"
                )
              }
              onClick={() => {
                setSelect("Submeter projeto");
              }}
            >
              Submeter projeto
            </Menu.Item>
          </div>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
}
