import { Button, Card, Divider, Form, Input, Typography, message } from "antd";
import { href, Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useColorPrimary } from "~/hooks/useColorPrimary";
import { useLogin } from "~/api-client/queries/auth";
import { TurnstileWidget } from "~/components/captcha";
import { LoadingOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const { locale } = useParams();
	const loginMutation = useLogin();
	const [token, setToken] = useState<string | null>(null);

	const onFinish = async (values: any) => {
		if (!token) {
			return message.error("no message");
		}
		try {
			await loginMutation.mutateAsync({
				email: values.email,
				password: values.password,
				token: token,
			});
			message.success("Signed in successfully");
			navigate(href("/:locale?/admin/dashboard", { locale }), {
				replace: true,
			});
			return true;
		} catch (error) {
			message.error((error as Error)?.message ?? "Sign in failed");
			return false;
		}
	};

	return (
		<Form name="login" onFinish={onFinish} size="large" layout="vertical">
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: "Please enter your email.",
					},
				]}
			>
				<Input
					prefix={<MailOutlined />}
					placeholder="email"
					autoComplete="email"
					allowClear
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: "Please enter your password.",
					},
					{
						min: 6,
						message: "Password must be at least 6 characters.",
					},
				]}
			>
				<Input.Password
					prefix={<LockOutlined />}
					placeholder="Password"
					autoComplete="current-password"
				/>
			</Form.Item>
			<Form.Item>
				<TurnstileWidget handleSuccess={(token) => setToken(token)} />
			</Form.Item>
			<Form.Item>
				<Button
					block
					type="primary"
					htmlType="submit"
					loading={loginMutation.isPending}
				>
					Login
				</Button>
			</Form.Item>
		</Form>
	);
};

export function Right() {
	const p = useColorPrimary();
	return (
		<Card
			className="w-full max-w-[520px] shadow-[0_20px_80px_rgba(15,23,42,0.12)]"
			styles={{ body: { padding: "32px" } }}
		>
			<div className="flex items-center gap-3">
				<LogoImg />
				<div>
					<Typography.Title level={4} style={{ margin: 0 }}>
						Remix Antd Admin
					</Typography.Title>
					<Typography.Text type="secondary">
						Login in to continue
					</Typography.Text>
				</div>
			</div>
			<Divider style={{ margin: "20px 0" }} />
			<LoginForm />
			<div className="flex items-center justify-between text-sm">
				<Typography.Text type="secondary">
					New here?{" "}
					<Link to="/auth/signup" style={{ color: p.colorPrimary }}>
						Create an account
					</Link>
				</Typography.Text>
				<Link to="/" className="text-gray-500">
					Back to home
				</Link>
			</div>
		</Card>
	);
}

function LogoImg() {
	return <img className="w-[44px] rounded-xl" alt="logo" src="/logo.png" />;
}
