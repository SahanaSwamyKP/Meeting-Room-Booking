using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MeetingsAPI.Data;

public partial class ProjectContext : DbContext
{
    public ProjectContext()
    {
    }

    public ProjectContext(DbContextOptions<ProjectContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EmpTab> EmpTabs { get; set; }

    public virtual DbSet<RoomTab> RoomTabs { get; set; }

    public virtual DbSet<SlotTab> SlotTabs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Server=FNFIDVPRE20509\\SQLSERVER; Database=Project; Trusted_Connection=True; TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EmpTab>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK__EmpTab__AF2DBB9904627C44");

            entity.ToTable("EmpTab");

            entity.Property(e => e.EmpEmail).HasMaxLength(100);
            entity.Property(e => e.EmpName).HasMaxLength(50);
            entity.Property(e => e.EmpPassword).HasMaxLength(100);
            entity.Property(e => e.EmpRole).HasMaxLength(10);
            entity.Property(e => e.EmpId).ValueGeneratedNever();
        });

        modelBuilder.Entity<RoomTab>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__RoomTab__32863939409ADF12");

            entity.ToTable("RoomTab");

            entity.Property(e => e.RoomName).HasMaxLength(50);
            entity.Property(e => e.RoomId).ValueGeneratedNever();
        });

        modelBuilder.Entity<SlotTab>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PK__SlotTab__0A124AAF3566F8F9");

            entity.ToTable("SlotTab");

            entity.Property(e => e.Date).HasColumnName("Date_");
            entity.Property(e => e.ETime).HasColumnName("E_time");
            entity.Property(e => e.STime).HasColumnName("S_time");

            entity.HasOne(d => d.Emp).WithMany(p => p.SlotTabs)
                .HasForeignKey(d => d.EmpId)
                .HasConstraintName("FK__SlotTab__EmpId__48CFD27E");

            entity.HasOne(d => d.Room).WithMany(p => p.SlotTabs)
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("FK__SlotTab__RoomId__4AB81AF0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
