import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, message, Typography } from "antd";
import type React from "react";
import { useState } from "react";
import { href, Link, useNavigate, useParams } from "react-router";
import { useEamilSignup } from "~/api-client/queries/auth";
import { TurnstileWidget } from "~/components/captcha";

const RegisterForm: React.FC = () => {
	const navigate = useNavigate();
	const { locale } = useParams();
	const signupMutation = useEamilSignup();
	const [token, setToken] = useState("");

	const onFinish = async (values: any) => {
		try {
			await signupMutation.mutateAsync({
				username: values.username,
				email: values.email,
				password: values.password,
				token: token,
			});
			message.success("Account created");
			navigate(href("/:locale?/auth/login", { locale }), { replace: true });
			return true;
		} catch (error) {
			message.error((error as Error)?.message ?? "Sign up failed");
			return false;
		}
	};

	return (
		<Form name="register" onFinish={onFinish} size="large" layout="vertical">
			<Form.Item
				name="username"
				rules={[
					{ required: true, message: "Please enter a username." },
					{ min: 2, message: "Username must be at least 2 characters." },
				]}
			>
				<Input
					prefix={<UserOutlined />}
					placeholder="Username"
					autoComplete="username"
					allowClear
				/>
			</Form.Item>
			<Form.Item
				name="email"
				rules={[{ type: "email", message: "Please enter a valid email." }]}
			>
				<Input
					prefix={<MailOutlined />}
					placeholder="Email"
					autoComplete="email"
					allowClear
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{ required: true, message: "Please enter a password." },
					{ min: 6, message: "Password must be at least 6 characters." },
				]}
			>
				<Input.Password
					prefix={<LockOutlined />}
					placeholder="Password"
					autoComplete="new-password"
				/>
			</Form.Item>
			<Form.Item
				name="passwordRe"
				dependencies={["password"]}
				rules={[
					{ required: true, message: "Please confirm your password." },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Passwords do not match."));
						},
					}),
				]}
			>
				<Input.Password
					prefix={<LockOutlined />}
					placeholder="Confirm password"
					autoComplete="new-password"
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
					loading={signupMutation.isPending}
					className="rounded-full transition hover:-translate-y-0.5 hover:shadow-[var(--mkt-shadow)]"
				>
					Create Account
				</Button>
			</Form.Item>
		</Form>
	);
};

export function Left() {
	const { locale } = useParams();
	return (
		<Card
			className="w-full max-w-[560px] rounded-[32px]"
			style={{
				background: "var(--mkt-surface)",
				borderColor: "var(--mkt-border)",
				boxShadow: "var(--mkt-shadow)",
			}}
			styles={{ body: { padding: "32px" } }}
		>
			<div className="flex items-center gap-3">
				<LogoImg />
				<div>
					<Typography.Title
						level={4}
						style={{ margin: 0, color: "var(--mkt-text)" }}
					>
						Remix Antd Admin
					</Typography.Title>
					<Typography.Text style={{ color: "var(--mkt-muted)" }}>
						Create your account
					</Typography.Text>
				</div>
			</div>
			<Divider style={{ margin: "20px 0", borderColor: "var(--mkt-border)" }} />
			<RegisterForm />
			<div className="flex items-center justify-between text-sm">
				<Typography.Text style={{ color: "var(--mkt-muted)" }}>
					Already have an account?{" "}
					<Link
						to={href("/:locale?/auth/login", { locale })}
						className="text-[var(--mkt-accent)]"
					>
						Sign in
					</Link>
				</Typography.Text>
				<Link to="/" className="text-[var(--mkt-muted)]">
					Back to home
				</Link>
			</div>
		</Card>
	);
}

function LogoImg() {
	return <img className="w-[44px] rounded-xl" alt="logo" src="/logo.png" />;
}
