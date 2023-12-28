import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

export function PanelGroup() {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="min-h-[200px] max-w-md rounded-lg border"
		>
			<ResizablePanel defaultSize={75}>
				<div className="flex h-full items-center justify-center p-6">
					<span className="font-semibold"> content</span>
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}