import {
	ActionIcon,
	Group,
	Menu,
	Title,
	Tooltip,
	useMantineColorScheme,
} from "@mantine/core";
import React, { FC } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { match } from "ts-pattern";

type MenuPart = {
	id: string;
	type: "item" | "divider";
	label?: string;
	onClick?: () => void;
};

const GetMenuPart: FC<{ part: MenuPart }> = ({ part }) =>
	match(part.type)
		.with("item", () => (
			<Menu.Item key={part.id} onClick={part.onClick}>
				{part.label}
			</Menu.Item>
		))
		.with("divider", () => <Menu.Divider key={part.id} />)
		.run();

export type AppHeaderProps = {
	onNew: () => void;
	onOpen: () => void;
	onSave: () => void;
	onImport: () => void;
	onExport: () => void;
	onClose: () => void;
};
export const AppHeader: React.FC<AppHeaderProps> = ({
	onNew,
	onOpen,
	onSave,
	onClose,
	onImport,
	onExport,
}) => {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	const menu: MenuPart[] = [
		{ id: crypto.randomUUID(), type: "item", label: "New", onClick: onNew },
		{ id: crypto.randomUUID(), type: "item", label: "Open", onClick: onOpen },
		{ id: crypto.randomUUID(), type: "divider" },
		{ id: crypto.randomUUID(), type: "item", label: "Save", onClick: onSave },
		{ id: crypto.randomUUID(), type: "divider" },
		{
			id: crypto.randomUUID(),
			type: "item",
			label: "Import",
			onClick: onImport,
		},
		{
			id: crypto.randomUUID(),
			type: "item",
			label: "Export",
			onClick: onExport,
		},
		{ id: crypto.randomUUID(), type: "divider" },
		{ id: crypto.randomUUID(), type: "item", label: "Close", onClick: onClose },
	];

	const actions = [
		{
			id: crypto.randomUUID(),
			onClick: toggleColorScheme,
			icon: colorScheme === "dark" ? MdOutlineLightMode : MdOutlineDarkMode,
			tooltip: "Toggle Theme",
		},
	];

	return (
		<Group
			pl={"xs"}
			pr={"xs"}
			align={"center"}
			justify={"space-between"}
			w={"100%"}
			styles={{ root: { overflow: "visible" } }}
		>
			<Group>
				<Menu position="bottom-start" shadow={"md"} width={200}>
					<Menu.Target>
						<ActionIcon variant={"subtle"} size={"lg"}>
							<VscThreeBars size={"1.5rem"} />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						{menu.map((part) => GetMenuPart({ part }))}
					</Menu.Dropdown>
				</Menu>
				<Title order={3}>C4Model.App</Title>
			</Group>
			<Group>
				{actions.map((it) => (
					<Tooltip key={it.id} label={it.tooltip} openDelay={500}>
						<ActionIcon
							key={it.id}
							variant={"default"}
							size={"lg"}
							radius={"md"}
							onClick={it.onClick}
						>
							<it.icon />
						</ActionIcon>
					</Tooltip>
				))}
			</Group>
		</Group>
	);
};
