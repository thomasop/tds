import React, { use, useEffect, useRef, useState } from "react";
import styles from "./formLogin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import validator from "validator";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import useSWRMutation from "swr/mutation";
import fetchPost from "../fetch/FetchPost";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const FormLogin = () => {
  const { displayModalLogin } = useSelector(
    (state: RootState) => state.ModalLogin
  );
  const dispatch = useDispatch<AppDispatch>();
  const [inputPseudo, setInputPseudo] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [rememberMeInput, setRememberMeInput] = useState<boolean>(false);
  const [validEmailInput, setValidEmailInput] = useState<boolean>(false);
  const [validPasswordInput, setValidPasswordInput] = useState<boolean>(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>("");
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>("");
  const [reSendEmail, setReSendEmail] = useState<boolean>(false);
  const [otherEmail, setOtherEmail] = useState<string>("");
  const [displayInput, setDisplayInput] = useState(false);
  const [codeInput, setCodeInput] = useState<string>("");
  const [validCodeInput, setValidCodeInput] = useState<boolean>(false);
  const [errorMessageCode, setErrorMessageCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reSendCode, setReSendCode] = useState<boolean>(false);

  const handlerInputRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMeInput(e.target.checked);
  };

  const { data, trigger, reset, isMutating } = useSWRMutation(
    "/api/user/reSendEmailValidation",
    fetchPost
  );
  useEffect(() => {
    if (data) {
      if (data.status === 200) {
        reset();
        if (isMutating === false) {
          dispatch({
            type: "flash/storeFlashMessage",
            payload: { type: "success", flashMessage: data.message },
          });
          setReSendEmail(false);
        }
      } else if (data.status === 400) {
        if (data.type === "validation") {
          reset();
          data.message.forEach((element: string) => {
            if (element[0] === "email") {
              dispatch({
                type: "flash/storeFlashMessage",
                payload: { type: "success", flashMessage: "L'addresse e" },
              });
            }
          });
        }
      } else {
        reset();
        if (isMutating === false) {
          dispatch({
            type: "flash/storeFlashMessage",
            payload: { type: "error", flashMessage: data.message },
          });
        }
      }
    }
  }, [data, dispatch, isMutating, reset]);

  const clearState = () => {
    setCodeInput("");
    setValidCodeInput(false);
    setDisplayInput(false);
    setInputPseudo("");
    setEmailInput("");
    setIsLoading(false);
    setPasswordInput("");
    setRememberMeInput(false);
    setValidEmailInput(false);
    setValidPasswordInput(false);
    setErrorMessageCode("");
    setErrorMessageEmail("");
    setErrorMessagePassword("");
    setReSendEmail(false);
    setOtherEmail("");
  };

  const {
    data: dataReSendCode,
    trigger: triggerReSendCode,
    reset: resetReSendCode,
    isMutating: isMutatingReSendCode,
  } = useSWRMutation("/api/user/sendTwoFactorCode", fetchPost);
  useEffect(() => {
    if (dataReSendCode) {
      if (dataReSendCode.status === 200) {
        if (isMutatingReSendCode === false) {
          dispatch({
            type: "flash/storeFlashMessage",
            payload: { type: "success", flashMessage: dataReSendCode.message },
          });
          setReSendCode(false);
          setValidCodeInput(false);
          setCodeInput("");
          resetReSendCode();
        }
      } else {
        if (isMutatingReSendCode === false) {
          dispatch({
            type: "flash/storeFlashMessage",
            payload: { type: "error", flashMessage: dataReSendCode.message },
          });
        }
      }
    }
  }, [dataReSendCode, dispatch, isMutatingReSendCode, resetReSendCode]);

  const closeForm = () => {
    /* dispatch({
      type: "auth/clearFlash",
    }); */
    clearState();
    dispatch({
      type: "ModalLogin/close",
    });
  };
  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "flash/clearFlashMessage",
    });
    //if (validEmailInput === true && validPasswordInput === true) {
    if (inputPseudo.length === 0) {
      setIsLoading(true);
      const fetchLogin = async () => {
        let response = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: validator.escape(emailInput.trim()),
            password: validator.escape(passwordInput.trim()),
            remember: rememberMeInput,
            pseudo: validator.escape(inputPseudo.trim()),
          }),
        });
        let json = await response.json();
        if (json) {
          if (json.status === 200) {
            if (json.body === null) {
              setDisplayInput(true);
              setIsLoading(false);
              dispatch({
                type: "flash/storeFlashMessage",
                payload: { type: "success", flashMessage: json.message },
              });
            } else {
              dispatch({
                type: "flash/storeFlashMessage",
                payload: { type: "success", flashMessage: json.message },
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }
          } else if (json.status === 400) {
            if (json.type === "validation") {
              setTimeout(() => {
                setIsLoading(false);
                json.message.forEach((element: string) => {
                  if (element[0] === "email") {
                    setErrorMessageEmail(element[1]);
                  }
                  if (element[0] === "password") {
                    setErrorMessagePassword(element[1]);
                  }
                });
              }, 1000);
            } else {
              if (
                json.message ===
                "Votre compte a été supprimé car vous ne l'avez pas validé à temps, veuillez vous réinscrire"
              ) {
                dispatch({
                  type: "flash/storeFlashMessage",
                  payload: { type: "error", flashMessage: json.message },
                });
                setTimeout(() => {
                  setIsLoading(false);
                  clearState();
                  dispatch({
                    type: "auth/clearFlash",
                  });
                  dispatch({ type: "ModalRegister/open" });
                  dispatch({ type: "ModalLogin/close" });
                }, 1000);
              } else if (
                json.message ===
                "Votre compte n'est pas encore validé, veuillez vérifier votre boite mail"
              ) {
                setTimeout(() => {
                  setIsLoading(false);
                  setReSendEmail(true);
                  setOtherEmail(emailInput);
                  dispatch({
                    type: "flash/storeFlashMessage",
                    payload: { type: "error", flashMessage: json.message },
                  });
                }, 1000);
              } else {
                setTimeout(() => {
                  setIsLoading(false);
                  dispatch({
                    type: "flash/storeFlashMessage",
                    payload: { type: "error", flashMessage: json.message },
                  });
                }, 1000);
              }
            }
          } else {
            setTimeout(() => {
              setIsLoading(false);
              dispatch({
                type: "flash/storeFlashMessage",
                payload: { type: "error", flashMessage: json.message },
              });
            }, 1000);
          }
        }
      };
      if (inputPseudo.length === 0) {
        fetchLogin();
      }
    }
    /* } else {
      if (validEmailInput === false) {
        setErrorMessageEmail("Email : doit avoir un format valide");
      }
      if (validPasswordInput === false) {
        setErrorMessagePassword(
          "Mot de passe : doit avoir une lettre en minuscule, un nombre et 8 caractères minimum"
        );
      }
    } */
  };

  const handlerInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
    regex: RegExp,
    setValidInput: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    errorMessage: string
  ) => {
    let removeSpace = "";
    if (e.target.value.charAt(0) === " ") {
      removeSpace = e.target.value.replace(/\s/, "");
      setInput(removeSpace);
    } else {
      removeSpace = e.target.value.replace(/\s\s+/g, " ");
      setInput(removeSpace);
    }
    setInput(removeSpace);
    if (regex.test(removeSpace)) {
      setValidInput(true);
      setErrorMessage("");
    } else if (removeSpace.length === 0) {
      setValidInput(false);
      setErrorMessage("");
    } else {
      setValidInput(false);
      setErrorMessage(errorMessage);
    }
  };
  const handlerSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validCodeInput === true) {
      if (inputPseudo.length === 0) {
        setIsLoading(true);
        const fetchLogin = async () => {
          let response = await fetch("/api/user/loginTwoFactor", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: validator.escape(emailInput.trim()),
              password: validator.escape(passwordInput.trim()),
              remember: rememberMeInput,
              pseudo: validator.escape(inputPseudo.trim()),
              code: codeInput,
            }),
          });
          let json = await response.json();
          if (json) {
            if (json.status === 200) {
              dispatch({
                type: "flash/storeFlashMessage",
                payload: { type: "success", flashMessage: json.message },
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              if (
                json.message === "Le code n'est plus valide, veuillez réessayer"
              ) {
                setTimeout(() => {
                  setIsLoading(false);
                  setReSendCode(true);
                  dispatch({
                    type: "flash/storeFlashMessage",
                    payload: { type: "error", flashMessage: json.message },
                  });
                }, 2000);
              } else {
                setTimeout(() => {
                  setIsLoading(false);
                  setReSendCode(true);
                  dispatch({
                    type: "flash/storeFlashMessage",
                    payload: { type: "error", flashMessage: json.message },
                  });
                }, 2000);
              }
            }
          }
        };
        fetchLogin();
      }
    } else {
      if (validCodeInput === false) {
        setErrorMessageCode("Code : ne doit pas être vide");
      }
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <AnimatePresence>
        {displayModalLogin === true && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3 } }}
              exit={{ opacity: 0 }}
              className={styles.bg}
              onClick={() => closeForm()}
            />
            <motion.div
              className={styles.login}
              initial={{ y: 200, x: "-50%", opacity: 0 }}
              animate={{
                y: "-50%",
                x: "-50%",
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              exit={{
                y: 200,
                x: "-50%",
                opacity: 0,
                transition: { duration: 0.3 },
              }}
            >
              <button className={styles.login__btn} onClick={() => closeForm()}>
                <Image
                  className={styles.login__btn__img}
                  src="/assets/icone/xmark-solid.svg"
                  alt="arrow-left"
                  width={30}
                  height={30}
                ></Image>
              </button>
              <h1 className={styles.login__h1}>Se connecter</h1>
              {displayInput === false && (
                <form
                  className={styles.login__form}
                  onSubmit={(e) => {
                    if (isLoading === false) {
                      handlerSubmit(e);
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  <FormControl variant="standard">
                    <InputLabel
                      sx={{
                        color: "black",
                        "&.Mui-focused": {
                          color: "#1976d2",
                        },
                      }}
                      htmlFor="standard-adornment-email"
                    >
                      Email
                    </InputLabel>
                    <Input
                      autoFocus
                      id="standard-adornment-email"
                      value={emailInput}
                      placeholder={"Entrez votre mail"}
                      type={"text"}
                      onChange={(e) => {
                        handlerInput(
                          e,
                          "email",
                          /^([\w.-]+)@([\w-]+)((\.(\w){2,})+)$/,
                          setValidEmailInput,
                          setErrorMessageEmail,
                          setEmailInput,
                          "Email : doit avoir un format valide"
                        );
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <AlternateEmailIcon
                            sx={{ color: "black" }}
                            aria-label="toggle email visibility"
                          >
                            <Visibility />
                          </AlternateEmailIcon>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText style={{ color: "red" }}>
                      {errorMessageEmail}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    variant="standard"
                    style={{ margin: "20px 0px" }}
                  >
                    <InputLabel
                      sx={{
                        color: "black",
                        "&.Mui-focused": {
                          color: "#1976d2",
                        },
                      }}
                      htmlFor="standard-adornment-password"
                    >
                      Mot de passe
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      value={passwordInput}
                      placeholder={"Entrez votre mot de passe"}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        handlerInput(
                          e,
                          "password",
                          /^(?=.*[a-zéèàùâûîiïüäÀÂÆÁÄÃÅĀÉÈÊËĘĖĒÎÏÌÍĮĪÔŒºÖÒÓÕØŌŸÿªæáãåāëęėēúūīįíìi]).{1,}$/,
                          setValidPasswordInput,
                          setErrorMessagePassword,
                          setPasswordInput,
                          "Mot de passe : doit avoir une lettre ne minuscule, un nombre et 8 caractères minimum"
                        );
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            sx={{ padding: "0px", color: "black" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText style={{ color: "red" }}>
                      {errorMessagePassword}
                    </FormHelperText>
                  </FormControl>

                  <FormControlLabel
                    className={styles.login__form__checkbox}
                    style={{
                      marginTop: "10px",
                      alignSelf: "start",
                      marginLeft: "0px",
                    }}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          handlerInputRememberMe(e);
                        }}
                      />
                    }
                    label="Se souvenir de moi"
                    labelPlacement="start"
                  />
                  <input
                    type="text"
                    name="pseudo"
                    id="pseudo"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={(e) => {
                      setInputPseudo(e.target.value);
                    }}
                  />
                  <div className={styles.login__form__submit}>
                    {isLoading === false && (
                      <input
                        className={styles.login__form__submit__btn}
                        type="submit"
                        value="Se connecter"
                      />
                    )}
                    {isLoading === true && (
                      <button
                        disabled
                        className={styles.login__form__submit__btn__load}
                      >
                        <span
                          className={
                            styles.login__form__submit__btn__load__span
                          }
                        >
                          Chargement
                        </span>

                        <div
                          className={styles.login__form__submit__btn__load__arc}
                        >
                          <div
                            className={
                              styles.login__form__submit__btn__load__arc__circle
                            }
                          ></div>
                        </div>
                      </button>
                    )}
                  </div>
                </form>
              )}

              {reSendEmail === true && displayInput === false && (
                <>
                  <div className={styles.login__forgot}>
                    {isMutating && (
                      <>
                        <button
                          disabled
                          className={styles.login__forgot__btn__load}
                        >
                          <span
                            className={styles.login__forgot__btn__load__span}
                          >
                            Chargement
                          </span>

                          <div className={styles.login__forgot__btn__load__arc}>
                            <div
                              className={
                                styles.login__forgot__btn__load__arc__circle
                              }
                            ></div>
                          </div>
                        </button>
                      </>
                    )}
                    {isMutating === false && (
                      <button
                        className={styles.login__forgot__btn}
                        onClick={() => {
                          dispatch({
                            type: "flash/clearFlashMessage",
                          });
                          trigger({ email: otherEmail });
                        }}
                      >
                        Renvoyer un mail de validation à {otherEmail}
                      </button>
                    )}
                  </div>
                </>
              )}
              {displayInput === false && (
                <>
                  <div className={styles.login__forgot}>
                    <button
                      className={styles.login__forgot__btn}
                      onClick={() => {
                        clearState();
                        dispatch({
                          type: "auth/clearFlash",
                        });
                        dispatch({ type: "ModalLogin/close" });
                        dispatch({ type: "ModalForgot/open" });
                      }}
                    >
                      Mot de passe oublié
                    </button>
                  </div>
                  <div className={styles.login__register}>
                    <button
                      className={styles.login__register__btn}
                      onClick={() => {
                        clearState();
                        dispatch({
                          type: "auth/clearFlash",
                        });
                        dispatch({ type: "ModalRegister/open" });
                        dispatch({ type: "ModalLogin/close" });
                      }}
                    >
                      Créer un compte
                    </button>
                  </div>
                </>
              )}
              {displayInput === true && (
                <>
                  <p>
                    L&apos;authentification à deux facteur est activé pour votre
                    compte
                  </p>
                  <form
                    className={styles.login__form}
                    onSubmit={(e) => {
                      handlerSubmitCode(e);
                    }}
                  >
                    <TextField
                      autoFocus
                      value={codeInput}
                      style={{ margin: "20px 0px 0px 0px" }}
                      id={"code"}
                      label={"Code"}
                      variant="standard"
                      type={"text"}
                      placeholder={"Entrez votre code"}
                      FormHelperTextProps={{ style: { color: "red" } }}
                      onChange={(e) => {
                        handlerInput(
                          e,
                          "firstname",
                          /^[0-9]{8,8}$/,
                          setValidCodeInput,
                          setErrorMessageCode,
                          setCodeInput,
                          "Code : 8 chiffres"
                        );
                      }}
                      helperText={errorMessageCode}
                    />
                    <div className={styles.login__form__submit}>
                      {isLoading === false && (
                        <input
                          className={styles.login__form__submit__btn}
                          type="submit"
                          value="Vérifier le code"
                        />
                      )}
                      {isLoading === true && (
                        <button
                          disabled
                          className={styles.login__form__submit__btn__load}
                        >
                          <span
                            className={
                              styles.login__form__submit__btn__load__span
                            }
                          >
                            Chargement
                          </span>

                          <div
                            className={
                              styles.login__form__submit__btn__load__arc
                            }
                          >
                            <div
                              className={
                                styles.login__form__submit__btn__load__arc__circle
                              }
                            ></div>
                          </div>
                        </button>
                      )}
                    </div>
                  </form>
                  {reSendCode === true && (
                    <div className={styles.login__forgot}>
                      {isMutatingReSendCode === false && (
                        <button
                          className={styles.login__forgot__btn}
                          onClick={() => {
                            triggerReSendCode({
                              email: validator.escape(emailInput.trim()),
                              password: validator.escape(passwordInput.trim()),
                              pseudo: validator.escape(inputPseudo.trim()),
                            });
                          }}
                        >
                          Renvoyer un code
                        </button>
                      )}

                      {isMutatingReSendCode === true && (
                        <button
                          disabled
                          className={styles.login__forgot__btn__load}
                        >
                          <span
                            className={styles.login__forgot__btn__load__span}
                          >
                            Chargement
                          </span>

                          <div className={styles.login__forgot__btn__load__arc}>
                            <div
                              className={
                                styles.login__forgot__btn__load__arc__circle
                              }
                            ></div>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FormLogin;

// /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
