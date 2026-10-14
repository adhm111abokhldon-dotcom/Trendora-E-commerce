import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PageTransition from "../components/PageTransition";
import { useAuth } from "@/context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchemas } from "@/schemas/loginSchemas";
import { Button } from "@base-ui/react";
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/api/auth";
import { useI18n } from "@/i18n";

const loginRequest = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => login({ username, password });

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useI18n();

  const form = useForm({
    resolver: zodResolver(loginSchemas),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { control, handleSubmit, reset, setValue } = form;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { handleLogin } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    mutationKey: ["login"],
    onSuccess: (data) => {
      handleLogin(data);
      reset();
      navigate(from, { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || t("login.error.invalid"));
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    loginMutation.mutate(data);
  };


  return (
    <PageTransition>
      <section className="min-h-screen bg-base-bg dark:bg-dark-bg flex-center p-6 ">
        <div
          className="w-full max-w-md bg-base-surface
         dark:bg-dark-surface p-8 rounded-xl shadow-sm border border-border-light
          dark:border-border-dark relative"
        >
          <Link
            to={"/"}
            className="absolute top-5 end-4 text-danger hover:text-danger-hover transition-colors"
          >
            <X className=" size-10 " />
          </Link>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-base-text dark:text-dark-text tracking-tight mb-2">
              {t("login.welcome")}
            </h2>
            <p className="text-sm text-base-text-muted dark:text-dark-text-muted font-medium">
              {t("login.subtitle")}
            </p>

            {/* Honest demo-access explanation */}
            <div
              className="mt-4 text-start text-xs leading-relaxed rounded-lg
              border border-border-light dark:border-border-dark bg-base-bg
              dark:bg-dark-bg p-3 text-base-text-muted dark:text-dark-text-muted"
              role="note"
            >
              <span className="font-bold text-accent-trendora">
                {t("login.demoHint")}
              </span>{" "}
              {t("login.demoNotice")}{" "}
              <span className="font-semibold text-base-text dark:text-dark-text">
                {t("login.demoCreds")}
              </span>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={control}
                name="username"
                render={({
                  field,
                  fieldState,
                }: {
                  field: any;
                  fieldState: any;
                }) => (
                  <FormItem className="flex flex-col gap-1.5">
                    <FormLabel
                      className="text-xs font-bold  tracking-wider
                     text-base-text/80 dark:text-dark-text/80"
                    >
                      {t("login.username")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="username"
                        placeholder={t("login.usernamePlaceholder")}
                        className={`h-11 px-4 rounded-lg bg-base-bg dark:bg-dark-bg border text-base-text dark:text-dark-text transition-all duration-200 placeholder:text-base-text-faint
                        ${
                          fieldState.error
                            ? "border-danger focus:ring-1 focus:ring-danger"
                            : "border-border-light dark:border-border-dark focus:ring-1! focus:ring-accent-trendora!"
                        }`}
                      />
                    </FormControl>

                    <FormMessage className="text-xs font-semibold text-danger dark:text-danger mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({
                  field,
                  fieldState,
                }: {
                  field: any;
                  fieldState: any;
                }) => (
                  <FormItem className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-xs font-bold  tracking-wider text-base-text/80 dark:text-dark-text/80">
                        {t("login.password")}
                      </FormLabel>
                      <span className="text-xs font-semibold text-accent-hover">
                        {t("login.forgot")}
                      </span>
                    </div>

                    <div className="relative flex items-center">
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder={t("login.passwordPlaceholder")}
                          className={`h-11 ps-4 pe-12 rounded-lg bg-base-bg dark:bg-dark-bg border text-base-text
                             dark:text-dark-text transition-all duration-200 placeholder:text-base-text-faint w-full
              ${
                fieldState.error
                  ? "border-danger focus:ring-1 focus:ring-danger"
                  : "border-border-light dark:border-border-dark focus:ring-1! focus:ring-accent-trendora!"
              }`}
                        />
                      </FormControl>

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword
                            ? t("login.hidePassword")
                            : t("login.showPassword")
                        }
                        className="absolute end-3 text-base-text-muted dark:text-dark-text-muted hover:text-base-text
                         dark:hover:text-dark-text transition-colors p-1 rounded-md"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <FormMessage className="text-xs font-semibold text-danger dark:text-danger mt-1" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full h-11 mt-2 bg-accent-trendora hover:bg-accent-hover
                 text-stone-900 font-bold rounded-lg shadow-sm transition-all duration-200
                  flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 border-2 border-stone-900 border-t-transparent 
                    rounded-full animate-spin"
                    />
                    {t("login.signingIn")}
                  </span>
                ) : (
                  t("login.signIn")
                )}
              </Button>

              {/* Demo helper: fills the existing fields; the visitor still
                  submits via the normal Sign In button above. */}
              <Button
                type="button"
                onClick={() => {
                  setValue("username", "demo", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setValue("password", "demo1234", {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className="w-full h-11 mt-3 bg-transparent hover:bg-base-bg
                 dark:hover:bg-dark-bg text-base-text dark:text-dark-text
                 font-bold rounded-lg border border-border-light
                 dark:border-border-dark transition-all duration-200
                 flex items-center justify-center gap-2"
              >
                {t("login.tryDemo")}
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center border-t border-border-light dark:border-border-dark pt-6">
            <p className="text-sm text-base-text-muted dark:text-dark-text-muted">
              {t("login.browseNoAccount")}{" "}
              <Link
                to="/categories"
                className="font-bold text-base-text dark:text-dark-text hover:text-accent-hover dark:hover:text-accent-trendora transition-colors"
              >
                {t("nav.demoCta")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Login;
