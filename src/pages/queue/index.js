import React, { memo, useEffect, useRef, useState } from "react";
import "./index.less";
import { message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import createWebSocket from "@/utils/websocket";
import FullBtn from "@/components/fullBtn";
import Cqueue from "./Cqueue";
import Speaker from "@/utils/Speaker";

import { handleQueues, callQueue } from "@/utils/handleQueueData";

// API
import { webSocketUrl, QRCodeUrl } from "@/api/baseUrl";
import { getTips, getTips2 } from "@/api/tips";

export default memo(function Queue(props) {
	const QueueSpeaker = new Speaker({
		lang: "zh-CN",
		pitch: 1,
		rate: 0.9,
		volume: 1,
	});

	const full_timer = useRef(null);
	const [btn_class, setClass] = useState("full-btn");

	// 队列数据
	const [appointmentList, updateAList] = useState([]);
	const [siteList, updateSList] = useState([]);
	// const [uergentList, updateUKist] = useState([]);

	// 是否全屏
	const [isFullScreen, updateFSstatues] = useState(false);
	const [tips, setTips] = useState("");

	// temp may change in the future
	const [tips2, setTips2] = useState("");

	// 二维码是否显示
	const [isShowQr, toggleShowQr] = useState(true);
	// 二维码显示控制按钮
	const [isShowBtn, toggleShowBtn] = useState(false);

	useEffect(() => {
		async function getText() {
			try {
				const { code, message: mes } = await getTips();
				!code && mes && setTips(mes);
				code && mes && message.error(mes);
			} catch (err) {
				message.error(err.message);
			}

			try {
				const res = await getTips2();
				const { code, message: mes } = await getTips2();
				console.log("tips2", mes);
				!code && mes && setTips2(mes);
				code && mes && message.error(mes);
			} catch (err) {
				message.error(err.message);
			}
		}
		getText();
		// websocket实例 开启连接
		const call_ws = new createWebSocket(webSocketUrl, getMes);

		return () => {
			QueueSpeaker.cancel();
			// 关闭websocket
			call_ws.close();
			clearTimeout(full_timer.current);
		};

		// eslint-disable-next-line
	}, []);

	function getMes(e) {
		let data = JSON.parse(e.data);
		console.log("数据变动Data", data);
		if (data.other) {
			// 数据变动
			let other = JSON.parse(data.other);
			let queueMessage = JSON.parse(data.queueMessage);

			switch (data.name) {
				case "预约队列":
					updateAList(handleQueues([...queueMessage, ...other]));
					break;
				case "现场队列":
					updateSList(handleQueues([...queueMessage, ...other]));
					break;
				// case "加急队列":
				//     updateUKist(handleQueues([...queueMessage, ...other]));
				//     break;
				default:
					message.error("匹配失败");
			}
			if (data.user) {
				// 有人被叫
				if (data.user.status != -1) {
					data.name = data.name == "加急队列" ? "对外队列" : data.name;
					callPerson(callQueue(data.name, data.user));
				}
			}
		} else if (data.siteCall) {
			// 第一次连接

			console.log("@", data.siteCall);

			let { siteCall, siteUnCall, subscribeCall, subscribeUnCall } = data;

			updateAList(handleQueues([...subscribeCall, ...subscribeUnCall]));
			updateSList(handleQueues([...siteCall, ...siteUnCall]));
			// updateUKist(handleQueues([...urgentCall, ...urgentUnCall]));
		}
	}

	// 叫号
	function callPerson(callV) {
		QueueSpeaker.activeSpeak(callV);
	}
	// 处理移动显示全屏icon
	function handleMove() {
		if (full_timer.current) clearTimeout(full_timer.current);
		if (btn_class.search("full-btn-move") === -1)
			setClass(btn_class + " full-btn-move");
		full_timer.current = setTimeout(() => {
			setClass("full-btn");
		}, 3000);
	}

	// 点击全屏回调
	function fullScreenCallb() {
		updateFSstatues(true);
		console.log(isFullScreen);
	}
	// 退出全屏时回调
	function quitFullScreenCallb() {
		console.log("退出全屏");
		updateFSstatues(isFullScreen);
	}

	// 显示因此二维码
	function handleMoveInQr(flag) {
		// 当二维码显示时
		if (isShowQr) {
			if (flag) {
				// 显示按钮
				toggleShowBtn(true);
			} else {
				// 隐藏按钮
				toggleShowBtn(false);
			}
		}
		return;
	}

	return (
		<div
			style={{
				display: "flex",
				padding: 10,
				backgroundColor: isFullScreen ? "#eaf4fc" : "#fff",
			}}
			className="queue-container"
		>
			{/* 队列数据 */}
			<div
				style={{
					width: "82%",
				}}
			>
				<div
					className="h_scroll queues"
					style={{ padding: 10, display: "flex" }}
				>
					<div
						style={{
							boxSizing: "border-box",
							width: "50%",
							paddingRight: "2%",
						}}
					>
						<Cqueue
							isFullScreen={isFullScreen}
							type="预约"
							list={appointmentList}
						/>
					</div>
					<div
						style={{
							boxSizing: "border-box",
							width: "50%",
							paddingRight: "2%",
						}}
					>
						<Cqueue isFullScreen={isFullScreen} type="现场" list={siteList} />
					</div>
				</div>
			</div>
			{/* 二维码和提示部分 */}
			<div style={{ width: "18%" }} onMouseMove={handleMove}>
				<div className={btn_class}>
					<FullBtn
						ele=".queue-container"
						enter={fullScreenCallb}
						quit={quitFullScreenCallb}
					></FullBtn>
				</div>

				{/* 二维码 */}
				<div className="qr-wrap">
					<div
						className="qr-code-box"
						onMouseEnter={() => handleMoveInQr(true)}
						onMouseLeave={() => handleMoveInQr(false)}
					>
						{isShowQr ? (
							<img className="qr-code" src={QRCodeUrl} alt="签到码" />
						) : (
							""
						)}
						<div
							className={!isShowBtn && isShowQr ? "hidden-qr" : "btn-shadow"}
							style={isShowQr ? {} : { backgroundColor: "transparent" }}
						>
							<div
								className="hidden-show-btn"
								onClick={() => toggleShowQr(!isShowQr)}
							>
								{isShowQr ? "隐藏二维码" : "显示二维码"}
							</div>
						</div>
					</div>

					{isShowQr ? <div className="qr-tip">请扫码签到排队</div> : ""}
					<div
						className="qr-tip hightlight"
						style={{ fontWeight: isFullScreen ? "bold" : "normal" }}
					>
						{tips2}
					</div>
				</div>

				{/* 温馨提示 */}
				<div className="alter">
					<div className="alter_title">
						<InfoCircleOutlined
							style={{ fontSize: "2.2vh", color: "#109efc", paddingRight: 11 }}
						/>
						温馨提示
					</div>
					<div className="alter_body">{tips}</div>
				</div>
			</div>
		</div>
	);
});
