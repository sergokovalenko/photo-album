package ru.sstu.photos.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sstu.photos.domain.VerificationCode;

public interface VerificationCodeRepo extends JpaRepository<VerificationCode, Long> {

}
