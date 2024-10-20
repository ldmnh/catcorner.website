"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

import { useState, useCallback, CSSProperties, useEffect } from "react";

import BeatLoader from "react-spinners/BeatLoader";
import { PasswordInput } from "@/components/(general)/inputs/input-password/page";

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};
// Define the form schema using Zod
const formSchema = z.object({
	email: z.string().email({ message: "Email không hợp lệ" }),
	password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" }),
});

export default function SignUpPage() {
	const [isSubmitting, setIsSubmitting] = useState(false); // Thêm state này
	const [isRegistering, setIsRegistering] = useState(false);

	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange", // Thêm dòng này để kích hoạt validation khi giá trị thay đổi
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsSubmitting(true);
			setIsRegistering(true);

			const apiPayload = {
				email: values.email,
				password: values.password,
			};
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(apiPayload),
				}
			);
			const data = await response.json();

			if (!response.ok) {
				toast.error(
					data.message || "Đăng nhập thất bại. Vui lòng thử lại sau."
				);
				setIsRegistering(false);
				return;
			}

			router.push(`/`);
		} catch (error) {
			toast.error("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
			setIsRegistering(false);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="md:bg-background-color mm:bg-white ml:bg-white">
			<div className="flex min-h-screen w-[80%] mx-auto bg-white">
				{/* Left side - Image */}
				<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
					<div className="absolute inset-0 transform scale-125 lg:scale-100">
						<Image
							src={`/imgs/auth/circle.png`}
							alt="Abstract background"
							layout="fill"
							objectFit="cover"
							quality={100}
							priority
						/>
					</div>
				</div>

				{/* Right side - Form */}
				<div className="w-full lg:w-1/2 px-[42px] py-[103px] mm:py-7 mm:px-0 ml:py-7 ml:px-0 sm:px-[42px] sm:py-[76px] flex flex-col justify-between">
					<main className="flex-grow">
						<h1 className="mb-2 text-2xl sm:text-3xl md:text-4xl">
							Chào mừng bạn quay lại !
						</h1>

						<Label className=" text-gray-500 font-light my-3 sm:my-5 sm:text-sm md:text-lg  block">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore.
						</Label>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4 sm:space-y-6"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-600 text-base">
												Email
											</FormLabel>
											<div className="relative">
												<FormControl>
													<Input
														type="email"
														{...field}
														placeholder="Enter your email"
														className={`bg-white ${
															field.value && !form.formState.errors.email
																? "border-green-500"
																: form.formState.errors.email
																? "border-red-500"
																: ""
														}`}
													/>
												</FormControl>

												{form.formState.errors.email && (
													<AlertCircle className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
												)}
											</div>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-gray-600 text-base">
												Password
											</FormLabel>
											<FormControl>
												<PasswordInput
													{...field}
													className={`bg-white ${
														field.value && !form.formState.errors.password
															? "border-green-500"
															: form.formState.errors.password
															? "border-red-500"
															: ""
													}`}
													placeholder="Enter your password"
												/>
											</FormControl>
											<FormMessage className="text-red-500" />
										</FormItem>
									)}
								/>

								<Button
									className="w-full sm:w-2/3 md:w-1/2 mx-auto block text-lg sm:text-xl md:text-2xl mt-8"
									disabled={
										!form.formState.isValid || isSubmitting || isRegistering
									}
									variant="custom"
									type="submit"
								>
									{isSubmitting ? (
										<BeatLoader color="#ffffff" size={8} />
									) : isRegistering ? (
										"Đang xử lý..."
									) : (
										"Đăng nhập"
									)}
								</Button>
							</form>
						</Form>

						<p className="text-center text-xs sm:text-sm text-muted-foreground mt-2">
							<Link
								href="/forgot-password"
								className="underline text-sm sm:text-base font-medium"
							>
								Forgot your password?
							</Link>
						</p>

						<div className="mt-4 sm:mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white text-base sm:text-lg md:text-xl">
										Or sign up with
									</span>
								</div>
							</div>
							<div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
								<Button
									variant="custom_outlined"
									className="w-full sm:w-48 text-base sm:text-lg md:text-xl"
								>
									<Image
										src={`/imgs/auth/fb_logo.svg`}
										alt="Facebook"
										width={32}
										height={32}
										className="mr-2"
										quality={100}
									/>
									Facebook
								</Button>
								<Button
									variant="custom_outlined"
									className="w-full sm:w-48 text-base sm:text-lg md:text-xl"
								>
									<Image
										src={`/imgs/auth/gg_logo.svg`}
										alt="Google"
										width={28}
										height={28}
										className="mr-2"
										quality={100}
									/>
									Google
								</Button>
							</div>
						</div>

						<Label className="text-center text-gray-500 font-light my-3 sm:my-5 text-xs sm:text-sm md:text-base block">
							Not a member? Get exclusive access to exhibitions and events, free
							admission every day, and much more.
						</Label>
					</main>
				</div>
				<ToastContainer />
			</div>
		</div>
	);
}
