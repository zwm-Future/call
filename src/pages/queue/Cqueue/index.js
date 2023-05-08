import { memo } from "react";
import { Table, ConfigProvider, Empty } from "antd";
import "./Cqueue.less";

let columns = [
	{
		title: "姓名",
		dataIndex: "name",
		// key: 'name',
		width: "35%",
	},
	{
		title: "排队序号",
		dataIndex: "key",
		// key: 'number',
		width: "40%",
	},
	{
		title: "窗口",
		dataIndex: "windowNum",
		// key: 'windowNum',
		width: "25%",
	},
];

const EmptyUI = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无人排队" />;

export default memo(function Cqueue(props) {
	return (
		<div className="queue_con">
			<div className="header">
				<div className="title">{props.type}队列</div>
				<div className="total">共（{props.list.length}）人</div>
			</div>
			<ConfigProvider renderEmpty={EmptyUI}>
				<Table
					scroll={
						props.list.length > 0
							? { y: props.isFullScreen ? "87vh" : "69vh" }
							: {}
					}
					bordered
					pagination={false}
					columns={columns}
					dataSource={props.list}
				/>
			</ConfigProvider>
		</div>
	);
});
