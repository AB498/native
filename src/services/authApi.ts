const API_BASE_URL = 'https://dev.bhcjobs.com';

export type RegisterPayload = {
  name: string;
  phone: string;
  dateOfBirth: string;
  passportNo: string;
  gender: string;
  email: string;
  password: string;
};

export type RegisterResult = {
  message: string;
  otp?: string;
};

export type VerifyPhonePayload = {
  phone: string;
  otp: string;
};

export type LoginPayload = {
  phone: string;
  password: string;
};

type ApiEnvelope<T = unknown> = {
  status?: boolean;
  success?: boolean;
  message?: string;
  data?: T;
  otp?: string | number;
  token?: string;
  error?: Record<string, string[] | string>;
};

function buildErrorMessage(payload: ApiEnvelope | null, fallback: string) {
  if (payload?.message && payload.message.trim().length > 0) {
    return payload.message;
  }

  if (payload?.error && typeof payload.error === 'object') {
    const messages = Object.entries(payload.error).flatMap(([, value]) => {
      if (Array.isArray(value)) {
        return value.filter(item => typeof item === 'string' && item.trim().length > 0);
      }

      if (typeof value === 'string' && value.trim().length > 0) {
        return [value];
      }

      return [];
    });

    if (messages.length > 0) {
      return messages.join('\n');
    }
  }

  return fallback;
}

async function postJson<TResponse>(
  path: string,
  body: Record<string, unknown>,
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  let payload: ApiEnvelope<TResponse> | null = null;

  try {
    payload = (await response.json()) as ApiEnvelope<TResponse>;
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.status === false || payload?.success === false) {
    throw new Error(buildErrorMessage(payload, `Request failed with status ${response.status}`));
  }

  if (payload?.data !== undefined) {
    return payload.data;
  }

  return (payload as TResponse | null) as TResponse;
}

function readOtp(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return undefined;
}

export async function registerJobSeeker(payload: RegisterPayload): Promise<RegisterResult> {
  const response = await postJson<ApiEnvelope>('/api/job_seeker/register', {
    name: payload.name,
    phone: payload.phone,
    email: payload.email,
    gender: payload.gender,
    dob: payload.dateOfBirth,
    passport_number: payload.passportNo,
    password: payload.password,
    confirm_password: payload.password,
  });

  const responseRecord = response as ApiEnvelope & Record<string, unknown>;
  const nestedData =
    responseRecord.data && typeof responseRecord.data === 'object'
      ? (responseRecord.data as Record<string, unknown>)
      : null;
  const otp =
    readOtp(responseRecord.otp) ??
    readOtp(responseRecord.data) ??
    readOtp(nestedData?.otp) ??
    readOtp(nestedData?.code);

  return {
    message: buildErrorMessage(responseRecord, 'Registration successful.'),
    otp,
  };
}

export async function verifyPhoneOtp(payload: VerifyPhonePayload): Promise<string> {
  const response = await postJson<ApiEnvelope>('/api/job_seeker/phone_verify', {
    phone: payload.phone,
    otp: payload.otp,
  });

  return buildErrorMessage(response as ApiEnvelope, 'Phone verification completed successfully.');
}

export async function loginJobSeeker(payload: LoginPayload): Promise<string> {
  const response = await postJson<ApiEnvelope>('/api/job_seeker/login', {
    phone: payload.phone,
    password: payload.password,
  });

  return buildErrorMessage(response as ApiEnvelope, 'Login successful.');
}
