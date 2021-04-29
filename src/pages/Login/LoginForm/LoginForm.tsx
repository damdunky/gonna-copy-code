import { A, useState } from "@hydrophobefireman/ui-lib";
import {
  altLinkBox,
  formContainer600px,
  loginButton,
  suggestionLink,
} from "@/Form.style";

import { Form } from "@/components/Form";
import { NextIcon } from "@/components/Icons/Next";
import { PasswordInput } from "@/components/FormFields/Password";
import { Snackbar } from "@/components/Snackbar/Snackbar";
import { UsernameInput } from "@/components/FormFields/Username";
import { css } from "catom";
import { login } from "@/packages/halo-api/user";

export function LoginForm() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  function reset() {
    setError(null);
    setLoading(false);
  }
  async function handleSubmit() {
    if (loading) return;
    setLoading(true);
    const { result } = login(username, password);
    const { error } = await result;
    if (error) return setError(error);
  }
  return (
    <div class={formContainer600px}>
      <Form onSubmit={handleSubmit}>
        <Snackbar onClose={reset} message={error} isError />
        <UsernameInput setUsername={setUsername} username={username} />
        <PasswordInput setPassword={setPassword} password={password} noFocus />
        <div class={formContainer600px}>
          <button class={loginButton}>
            {loading ? (
              "Wait.."
            ) : (
              <>
                <span class={css({ marginLeft: "5px", marginRight: "5px" })}>
                  Submit
                </span>
                <NextIcon size="1.2rem" />
              </>
            )}
          </button>
        </div>
        <div class={altLinkBox}>
          <A href="/forgot-password" class={suggestionLink}>
            Forgot Password?
          </A>
          <A href="/register" class={suggestionLink}>
            Register
          </A>
        </div>
      </Form>
    </div>
  );
}
