"use client";

export default function ConfigExportCard() {
  return (
    <div className="rounded-xl border p-4" style={{ background: "var(--a-card)", borderColor: "var(--a-border)" }}>
      <div className="text-base font-semibold">导出全量备份</div>
      <p className="mt-2 text-sm" style={{ color: "var(--a-muted)" }}>
        导出当前家庭的全量业务快照，包含账号、积分规则、积分流水、任务计划与日志、奖励兑换、宠物数据、推送订阅和系统配置，适合做家庭场景下的完整备份。
      </p>
      <p className="mt-2 text-xs" style={{ color: "var(--a-muted)" }}>
        备份文件会包含密码哈希、PIN 哈希和其他敏感数据，请妥善保管。若你有本地上传的头像、图片或模型文件，还需要单独备份 uploads 目录。
      </p>
      <a
        href="/api/admin/config-export"
        className="mt-4 inline-flex rounded-xl px-4 py-2 text-sm font-medium text-white"
        style={{ background: "var(--a-accent)" }}
      >
        下载备份 JSON
      </a>
    </div>
  );
}
