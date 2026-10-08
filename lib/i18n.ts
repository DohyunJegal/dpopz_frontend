export type Lang = "ko" | "en" | "ja";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "ko", label: "KO" },
  { code: "ja", label: "JA" },
  { code: "en", label: "EN" },
];

export interface SignupText {
  labelId: string; labelPw: string; labelPwConfirm: string; labelIidx: string; labelEmail: string;
  hintId: string; hintPw: string; hintIidx: string; hintEmail: string;
  request: string; sending: string; back: string;
  termsTitle: string; terms: string[]; termsCheck: string;
  success: string;
  errId: string; errPw: string; errMatch: string; errIidx: string; errEmail: string; errServer: string;
}

export const SIGNUP: Record<Lang, SignupText> = {
  en: {
    labelId: "ID", labelPw: "Password", labelPwConfirm: "Confirm Password", labelIidx: "IIDX ID", labelEmail: "e-mail",
    hintId: "4-20 characters: letters, numbers, _ . -",
    hintPw: "At least 6 characters, including letters and numbers.",
    hintIidx: "Enter your 8-digit IIDX ID.",
    hintEmail: "Enter a valid email address.",
    request: "Request", sending: "Sending...", back: "← Back to Login",
    termsTitle: "Terms & Conditions: I have read and agree to all of the following terms, and I proceed with the sign-up request accordingly.",
    terms: [
      "※ Passwords are stored encrypted (hashed), but please avoid using a password you use on other services.",
      "※ The IIDX ID and e-mail entered during sign-up will only be used for identity verification purposes.",
      "※ Only one account is allowed per IIDX ID. Duplicate registrations are not permitted.",
      "※ You can log in and vote after your sign-up request is approved by an administrator. Votes are applied after review; submitted votes cannot be cancelled or edited.",
    ],
    termsCheck: "I have read and agree to all of the above terms.",
    success: "Sign-up request submitted! You can log in after admin approval.",
    errId: "ID must be 4-20 characters (letters, numbers, _ . -).",
    errPw: "Password must be at least 6 characters and include letters and numbers.",
    errMatch: "Passwords do not match.",
    errIidx: "IIDX ID must be exactly 8 digits.",
    errEmail: "Invalid email format.",
    errServer: "Could not connect to the server.",
  },
  ko: {
    labelId: "ID", labelPw: "비밀번호", labelPwConfirm: "비밀번호 확인", labelIidx: "IIDX ID", labelEmail: "이메일",
    hintId: "영문, 숫자, _ . - 로 4~20자",
    hintPw: "6자 이상, 영문+숫자를 포함해야 합니다.",
    hintIidx: "8자리 숫자를 입력해주세요.",
    hintEmail: "유효한 이메일 주소를 입력해주세요.",
    request: "가입 신청", sending: "전송 중...", back: "← 로그인으로 돌아가기",
    termsTitle: "약관 사항: 아래 내용을 모두 확인하였으며, 동의한 아래 가입 신청을 진행합니다.",
    terms: [
      "※ 비밀번호는 암호화(해시)되어 저장되지만, 다른 서비스와 같은 비밀번호는 사용하지 않기를 권장합니다.",
      "※ 회원 가입 시 작성되는 IIDX ID 및 e-mail은 본인 확인을 위한 수단으로만 사용됩니다.",
      "※ IIDX ID당 1개의 ID만 가입이 가능하며, 중복 가입은 허용되지 않습니다.",
      "※ 가입 신청을 관리자가 승인한 뒤에 로그인 및 Vote 기능을 이용할 수 있습니다. 투표는 검수 후 반영되며, 한 번 투표된 데이터는 취소하거나 수정할 수 없습니다.",
    ],
    termsCheck: "위의 모든 약관을 읽고 동의합니다.",
    success: "가입 신청이 완료됐습니다! 관리자 승인 후 로그인이 가능합니다.",
    errId: "ID는 영문, 숫자, _ . - 로 4~20자여야 합니다.",
    errPw: "비밀번호는 6자 이상, 영문+숫자를 포함해야 합니다.",
    errMatch: "비밀번호가 일치하지 않습니다.",
    errIidx: "IIDX ID는 8자리 숫자여야 합니다.",
    errEmail: "이메일 형식을 확인해주세요.",
    errServer: "서버에 연결할 수 없습니다.",
  },
  ja: {
    labelId: "ID", labelPw: "パスワード", labelPwConfirm: "パスワード確認", labelIidx: "IIDX ID", labelEmail: "メールアドレス",
    hintId: "英数字と _ . - で4〜20文字",
    hintPw: "6文字以上、英字と数字を含めてください。",
    hintIidx: "8桁の数字を入力してください。",
    hintEmail: "有効なメールアドレスを入力してください。",
    request: "登録申請", sending: "送信中...", back: "← ログインに戻る",
    termsTitle: "利用規約：以下の内容をすべて確認し、同意の上で登録申請を進めます。",
    terms: [
      "※ パスワードは暗号化(ハッシュ)して保存されますが、他のサービスと同じパスワードの使用はお控えください。",
      "※ 登録時に入力するIIDX IDおよびメールアドレスは、本人確認の目的のみに使用されます。",
      "※ IIDX IDにつき1アカウントのみ登録可能です。重複登録は許可されていません。",
      "※ 登録申請を管理者が承認した後にログインおよびVote機能をご利用いただけます。投票は審査後に反映され、一度投票したデータはキャンセル・修正できません。",
    ],
    termsCheck: "上記すべての利用規約を読み、同意します。",
    success: "登録申請が完了しました！管理者の承認後にログインが可能になります。",
    errId: "IDは英数字と _ . - で4〜20文字である必要があります。",
    errPw: "パスワードは6文字以上で、英字と数字を含めてください。",
    errMatch: "パスワードが一致しません。",
    errIidx: "IIDX IDは8桁の数字である必要があります。",
    errEmail: "メールアドレスの形式を確認してください。",
    errServer: "サーバーに接続できませんでした。",
  },
};
